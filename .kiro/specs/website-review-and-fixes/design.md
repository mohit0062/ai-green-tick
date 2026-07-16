# Design — Full Website Review & Fixes (Audit + Remediation Plan)

## Overview
This document is the audit output for the whole-site review. It lists concrete findings with file references, severity (P0 → P2), current status (FIXED in prior work / OPEN / OWNER-ACTION), and the fix approach. Tasks.md will implement the OPEN items in priority order.

Severity: **P0** = security / data-loss / broken page. **P1** = user-facing impact (SEO, performance, a11y, reliability). **P2** = consistency / maintainability. **OWNER** = requires account/DNS/secret access only the owner has.

## Methodology
- Static review of `app/`, `components/`, `utils/`, API routes, server actions (read + grep).
- Live DB/RLS/storage/auth-config inspection via Supabase (anon probe + Management API).
- Production build + type-check + live endpoint checks.

---

## 1. Security & Access Control (Req 1)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| S1 | P0 | FIXED | `admin` table had `{public} ALL using true` → anon could read passwords & create/modify admins. | RLS: dropped public policies; `is_admin()`-gated authenticated policy. Verify holds. |
| S2 | P0 | FIXED | Storage `media` bucket had `{public}` INSERT/DELETE → anyone could upload/overwrite/delete files. | Dropped public write/delete; uploads routed via service-role client. Verify holds. |
| S3 | P0 | FIXED | Public signup enabled + `getAdminContext` defaulted unknown sessions to `editor`. | `disable_signup=true`; getAdminContext returns null for non-admin sessions. Verify holds. |
| S4 | P0 | FIXED | Admin passwords stored/compared in plaintext. | Hash on create/change; login verifies hash/env. Legacy rows → OWNER reset. |
| S5 | P1 | FIXED | `/api/ai` cost-abuse; leads form unvalidated. | 30/min limiter on `/api/ai`; email/length validation on leads. |
| S6 | P1 | OPEN | `extracted_zip/` at repo root is a full duplicate project **including its own `.env`** — potential secret exposure + confusion. | Remove `extracted_zip/` from the repo; confirm no secret leaked; ensure ignored. |
| S7 | OWNER | OPEN | service_role key, admin passwords, and the Supabase PAT were exposed during work. | Owner: rotate service_role key (update Vercel env), reset admin passwords, revoke PAT. |
| S8 | P2 | OPEN | Repeated inline auth blocks across some routes; two upload code paths. | Consolidate on `requireAdmin` + a single upload helper (both already service-role). |

## 2. SEO / AEO / GEO (Req 2)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| SEO1 | P1 | OPEN | No `SoftwareApplication` + `Offers` + `AggregateRating` JSON-LD for the SaaS/pricing. | Add SoftwareApplication schema (pricing plans as Offers) on home/pricing. |
| SEO2 | P1 | OPEN | Only a static `/og-image.png`; no per-page social cards. | Add dynamic OG images via `next/og` (ImageResponse) for pages/blog. |
| SEO3 | P1 | OPEN | FAQPage JSON-LD missing on features/solutions/industries/pricing detail pages (CMS has FAQs). | Emit FAQPage schema where CMS FAQ content exists. |
| SEO4 | P1 | OWNER | Canonical/sitemap/robots all target `aigreentick.com`, but that domain is not connected to the Vercel project (site serves at the vercel domain). | Owner: connect `aigreentick.com` in Vercel → Domains (or change CMS canonicalBase). |
| SEO5 | P2 | OPEN | No `Review`/`Testimonial` structured data despite testimonials in CMS. | Emit Review/AggregateRating from testimonials. |
| SEO6 | P2 | OPEN | No blog RSS feed. | Add `/feed.xml` route from published blogs. |
| SEO7 | P2 | OPEN | Sitemap `lastmod` uses `now` for CMS collections. | Use real `updated_at` where available. |

## 3. UI & Design-System Consistency (Req 3)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| UI1 | P1 | FIXED | Industries editor hardcoded `fontFamily: 'Inter, system-ui'` → rendered in system font. | Replaced with `font-sans` (design-system Inter). |
| UI2 | P2 | OPEN | Industries editor uses default `gray-*` palette vs `neutral-*`/brand tokens elsewhere. | Align to design-system tokens (neutral/brand). |
| UI3 | P2 | OPEN | Verify consistent button/input focus + hover states across admin editors. | Audit + normalize control states. |
| UI4 | P2 | OPEN | Verify no mobile overflow/broken spacing on marketing pages. | Responsive pass on key pages. |

## 4. Performance & Core Web Vitals (Req 4)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| PERF1 | P1 | OPEN | Almost all images use raw `<img>` (blog, features, header logo, cards); only team-inbox uses next/image. Unoptimized LCP/bandwidth. | Migrate to `next/image` with sizes/priority; configure remote patterns for CDN/unsplash/dicebear. |
| PERF2 | P1 | OPEN | `hero-section-40.tsx` is a very large client component (heavy JS, drives homepage LCP/TBT). | Split static portions to server components; trim client JS. |
| PERF3 | P2 | OPEN | Verify no render-blocking/unused deps (3D/gsap libs) on pages that don't need them. | Lazy-load heavy visual libs; code-split. |

## 5. Accessibility (Req 5)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| A11Y1 | P1 | OPEN | Icon-only buttons across UI need consistent `aria-label` (some fixed in RichEditor; others unaudited). | Sweep icon-only controls; add aria-labels. |
| A11Y2 | P2 | PARTIAL | Most `<img>` have alt (good); verify decorative vs meaningful alt correctness. | Review alt text; empty alt for decorative. |
| A11Y3 | P2 | OPEN | Verify keyboard operability + visible focus on custom interactive elements (cursor-target, tabs). | Ensure focus-visible styles + keyboard handlers. |
| A11Y4 | P2 | OPEN | Contrast of light-gray text (neutral-400/450 on white) may fail AA. | Flag/darken low-contrast text. |

## 6. Data Integrity & CMS Correctness (Req 6)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| DATA1 | P1 | OWNER | `auth.users` and `admin` table diverge: non-admin auth accounts (`client@lumiere.com`, `admin@lumiere.com`, `admin@aigreentick.com`) exist; several admin rows have no auth account. | Owner: delete/reconcile non-admin auth users; recreate missing admin auth accounts. |
| DATA2 | P2 | FIXED | Blog AEO (AI snapshot/FAQ) had no columns. | Stored in `site_sections` (keyed by blog id); renders + FAQ schema. Verify. |
| DATA3 | P2 | OPEN | CMS content typed as `any` throughout → field drift risk. | Introduce shared TS types (or zod) for section shapes. |

## 7. Reliability, Error Handling & Monitoring (Req 7)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| REL1 | P1 | FIXED | Admin error page leaked stack traces in prod. | Prod-safe message + digest; dev shows detail. |
| REL2 | P1 | FIXED/OWNER | No analytics; no error monitoring. | Vercel Analytics + Speed Insights added. Sentry needs OWNER DSN. |
| REL3 | P2 | OPEN | Confirm all external calls (Supabase/AI/storage) are wrapped so a failure never white-screens a page. | Audit try/catch + fallbacks on public pages. |

## 8. Code Quality & Maintainability (Req 8)

| ID | Sev | Status | Finding | Fix approach |
|----|-----|--------|---------|--------------|
| CQ1 | P1 | OPEN | `extracted_zip/` duplicate project is dead weight (also see S6). | Remove. |
| CQ2 | P2 | OPEN | Monolithic editor components (homepage/blog/feature forms 700–1500+ lines). | Extract sub-components incrementally. |
| CQ3 | P2 | OPEN | Duplicate upload logic (`/api/upload` + `uploadCMSImageAction`). | Extract one shared storage helper. |
| CQ4 | P0-gate | ONGOING | `tsc --noEmit` + prod build must stay green after every change. | Verify per task. |

---

## Cross-Cutting Design Decisions
1. **Service-role for privileged writes** (already established in `utils/supabase/service.ts`): all protected-table/storage writes go through it after `requireAdmin`/`requireSuperAdmin`. New fixes follow this pattern; anon/SSR client used only for public reads.
2. **Structured data**: centralize JSON-LD builders in `components/json-ld.tsx` (extend with SoftwareApplication/Review helpers); pages compose them. `getSiteUrl()` remains the single origin source.
3. **Images**: adopt `next/image`; add `images.remotePatterns` in `next.config.ts` for the external hosts (cdn.shadcnstudio.com, images.unsplash.com, api.dicebear.com, supabase storage). Provide width/height or `fill`+`sizes`.
4. **OG images**: a single `app/og/route.tsx` (ImageResponse) parameterized by title/subtitle; pages set `openGraph.images` to it.
5. **Verification**: every task ends with `tsc --noEmit`; P0/P1 also get a targeted live/anon-probe or page check. No task is complete until verification passes.

## Owner-Only Actions (documented, not performed)
- Rotate service_role key + reset admin passwords + revoke Supabase PAT (S7, S4).
- Connect `aigreentick.com` domain in Vercel (SEO4).
- Reconcile `auth.users` vs `admin` accounts (DATA1).
- Provide Sentry DSN if error monitoring is desired (REL2).

## Task Ordering (preview for tasks.md)
P0/P0-verify → S6/CQ1 (remove extracted_zip) → PERF1 (next/image) → SEO1/SEO3 (schema) → A11Y1 → UI2 → SEO2 (OG images) → SEO5/SEO6/SEO7 → PERF2 → REL3 → DATA3/CQ2/CQ3. Owner actions surfaced as a checklist, not code tasks.