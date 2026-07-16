# Implementation Plan

Execute in order. Each task ends with `npx tsc --noEmit` passing; P0/P1 tasks also get a targeted verification (anon probe, live page check, or build). Fix IDs reference design.md.

- [ ] 1. Verify prior P0 security fixes still hold
  - Re-run anon probe: `admin`/`leads`/`website_leads` read = 0 rows, anon `admin` write = 401, anon storage write = blocked.
  - Confirm `disable_signup=true`, and `getAdminContext` returns null for non-admin sessions.
  - Run `npx tsc --noEmit` + `npm run build` as green baseline.
  - _Requirements: 1.1, 1.2, 1.3, 1.7, 8.1_ (design S1–S5)

- [ ] 2. Remove dead `extracted_zip/` duplicate project
  - Delete the `extracted_zip/` directory (a full duplicate app including its own `.env`).
  - Confirm nothing in the live app imports from it; run build to verify no breakage.
  - _Requirements: 8.3, 1.6_ (design S6, CQ1)

- [ ] 3. Adopt next/image for optimized images
  - Add `images.remotePatterns` in `next.config.ts` for cdn.shadcnstudio.com, images.unsplash.com, api.dicebear.com, and the Supabase storage host.
  - Migrate raw `<img>` to `next/image` in: blog-card, blog-list-client, blog/[slug] detail, features/[slug] detail, header logo (use width/height or fill+sizes; `priority` for above-the-fold).
  - _Requirements: 4.2_ (design PERF1)

- [ ] 4. Add SoftwareApplication structured data
  - Add a `SoftwareApplicationSchema` JSON-LD helper (name, description, offers from pricing plans, optional aggregateRating) and render it on home and/or pricing.
  - _Requirements: 2.2_ (design SEO1)

- [ ] 5. Add FAQPage JSON-LD to detail pages
  - Emit FAQPage structured data on features/[slug], solutions/[slug], industries/[slug], and pricing where CMS FAQ content exists.
  - _Requirements: 2.2, 2.5_ (design SEO3)

- [ ] 6. Accessibility sweep for interactive controls
  - Add `aria-label` to icon-only buttons/links missing an accessible name across public + admin components.
  - Ensure decorative images use empty alt and meaningful images have descriptive alt.
  - _Requirements: 5.1, 5.2_ (design A11Y1, A11Y2)

- [ ] 7. Align industries editor to design tokens
  - Replace default `gray-*` palette usage with the design-system `neutral-*`/brand tokens used by sibling editors.
  - _Requirements: 3.2_ (design UI2)

- [ ] 8. Dynamic OG images
  - Add `app/og/route.tsx` using `ImageResponse` (title/subtitle params, brand styling).
  - Wire `openGraph.images`/`twitter.images` in generateMetadata for home, blog/[slug], and key pages.
  - _Requirements: 2.3_ (design SEO2)

- [ ] 9. Review / AggregateRating structured data
  - Emit Review/AggregateRating JSON-LD derived from CMS testimonials.
  - _Requirements: 2.2_ (design SEO5)

- [ ] 10. Blog RSS feed
  - Add `app/feed.xml/route.ts` generating RSS from published blogs (title, link, description, pubDate).
  - _Requirements: 2.1_ (design SEO6)

- [ ] 11. Accurate sitemap lastmod
  - Use real `updated_at`/`created_at` timestamps for CMS-driven sitemap entries instead of `now`.
  - _Requirements: 2.1, 6.1_ (design SEO7)

- [ ] 12. Reliability: guard public-page external calls
  - Audit public pages (home, blog, features/solutions/industries, pricing, contact) so Supabase/AI/storage failures fall back to defaults and never white-screen.
  - _Requirements: 7.2_ (design REL3)

- [ ] 13. Consolidate duplicate upload logic
  - Extract one shared storage-upload helper used by both `/api/upload` and `uploadCMSImageAction` (both already service-role).
  - _Requirements: 8.2_ (design CQ3)

- [ ] 14. Final verification and deploy
  - `npx tsc --noEmit` + `npm run build` clean.
  - Live smoke test key public pages + `/sitemap.xml`, `/llms.txt`, `/feed.xml`.
  - Commit, push, and deploy to production (`vercel --prod`); re-verify live.
  - _Requirements: 8.1_

---

## Deferred / larger refactors (not auto-run — do on request)
- **PERF2**: Split `hero-section-40.tsx` static portions into server components; lazy-load 3D/gsap-heavy visuals (`react-three`, `matter-js`, `gsap`) so they don't ship on pages that don't need them. (High value, higher risk — landing page.)
- **CQ2**: Break monolithic editors (homepage/blog/feature forms) into sub-components.
- **DATA3**: Introduce shared TS types (or zod) for CMS section shapes to replace `any`.
- **UI3/UI4/A11Y3/A11Y4**: Full control-state normalization, responsive pass, contrast/focus audit (needs visual QA).

## Owner-only actions (cannot be automated — checklist for you)
- Rotate Supabase **service_role key** → update `SUPABASE_SERVICE_ROLE_KEY` in Vercel (uploads depend on it).
- Reset all **admin passwords** (password column was previously public).
- Revoke the Supabase **Personal Access Token** used during this work.
- Connect **aigreentick.com** domain in Vercel → Project → Domains (or change CMS canonicalBase to the vercel domain).
- Reconcile **auth.users vs admin**: remove non-admin accounts (client@lumiere.com, admin@lumiere.com, admin@aigreentick.com); create auth accounts for admin rows that lack them.
- (Optional) Provide a **Sentry DSN** to enable error monitoring.
