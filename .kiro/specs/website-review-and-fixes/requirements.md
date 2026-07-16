# Requirements — Full Website Review & Fixes

## Introduction

AI Greentick is a Next.js 16 (App Router) marketing website + Supabase-backed CMS admin panel for a WhatsApp Business API product, deployed on Vercel. This spec captures a **comprehensive review of the entire website** and defines the acceptance criteria for remediating every issue found, across security, SEO/AEO/GEO, UI/design-system consistency, performance, accessibility, data integrity, reliability, and code quality.

This is a **review-and-remediation** spec: the Design phase will contain the actual audit (a categorized, severity-ranked list of concrete findings with file references), and the Tasks phase will implement the fixes. Some issues were already addressed in prior work (admin auth guards, password hashing, RLS lockdown of `admin`/`site_sections`/`blogs`/storage, signup disable, SEO/AEO/AGO scaffolding, blog AEO, an admin-editor font fix); this review must **verify those hold** and find what remains.

### Scope
- Public marketing pages: home, about, careers, contact, pricing, features/[slug], solutions/[slug], industries/[slug], integrations, blog, blog/[slug], and static/legal pages.
- Admin CMS: all editors under `app/admin/(protected)/*`, auth/login, users management.
- Cross-cutting: `app/layout.tsx`, `utils/*`, `components/*`, API routes (`/api/ai`, `/api/upload`), server actions, Supabase RLS, storage, and Vercel config.

### Out of scope
- Rotating live credentials, connecting DNS/domains, creating third-party accounts (Sentry/GSC) — these are owner actions; the spec will document them but not perform them.
- Net-new product features beyond fixing/hardening existing functionality.

---

## Requirements

### Requirement 1 — Security & Access Control

**User Story:** As the site owner, I want the application and database to be secure by default, so that no unauthenticated or non-admin actor can read sensitive data or perform privileged actions.

#### Acceptance Criteria
1. WHEN the public (anon) Supabase key is used to query `admin`, `leads`, `website_leads`, or storage writes, THEN the system SHALL deny access (0 rows / 401 / 403).
2. WHEN a valid Supabase session exists that is NOT present in the `admin` table, THEN the system SHALL NOT grant any admin or editor access.
3. WHERE a server action or API route performs a privileged read/write, the system SHALL enforce an authorization check (requireAdmin / requireSuperAdmin / section access) before the operation.
4. WHERE privileged database or storage writes occur, the system SHALL use the service-role client (bypassing RLS) only after an authorization check, and the anon/SSR client SHALL NOT be relied upon for writes to protected tables.
5. WHEN the AI generation or upload endpoints receive requests, THEN the system SHALL require authentication and apply rate limiting to curb cost/abuse.
6. IF secrets (service_role key, admin passwords, tokens) are referenced, THEN they SHALL never be committed to git, echoed to the client bundle, or logged; the audit SHALL confirm `.env*` is git-ignored and no secret is exposed to `NEXT_PUBLIC_*`.
7. WHEN admin passwords are stored, THEN they SHALL be hashed (never plaintext).

### Requirement 2 — SEO / AEO / GEO Completeness

**User Story:** As a marketer, I want the site fully optimized for search engines and AI answer/generative engines, so that pages rank and get cited accurately.

#### Acceptance Criteria
1. WHEN a crawler requests `/sitemap.xml`, `/robots.txt`, or `/llms.txt`, THEN each SHALL return valid content referencing a single consistent canonical origin.
2. WHERE structured data is expected (Organization, WebSite, BreadcrumbList, FAQPage, BlogPosting, Service/SoftwareApplication), the system SHALL emit valid JSON-LD on the relevant pages, and it SHALL pass Rich Results validation.
3. WHEN any indexable page renders, THEN it SHALL have a unique title, meta description, canonical URL, and OpenGraph/Twitter tags derived from CMS content.
4. WHERE canonical/sitemap/robots/JSON-LD reference the site origin, they SHALL all use the same domain (no mismatch between vercel domain and brand domain).
5. WHERE FAQ content exists in the CMS for a page (features/solutions/industries/pricing), the system SHALL expose it as FAQPage structured data.
6. IF a page is marked noindex in the CMS, THEN the rendered metadata SHALL reflect `robots: noindex`.

### Requirement 3 — UI & Design-System Consistency

**User Story:** As a visitor and admin, I want every page to follow one consistent design system, so that fonts, colors, and spacing look intentional and unified.

#### Acceptance Criteria
1. WHERE text renders, the system SHALL use the design-system fonts (Inter via `--font-inter`/`font-sans`, Manrope via `--font-display` for headings, Geist Mono via `font-mono`) and SHALL NOT hardcode font-family names that bypass the loaded fonts.
2. WHEN admin editors and public pages render, THEN they SHALL use the design-system color tokens/palette consistently (avoid mixing default Tailwind `gray-*` with brand `neutral-*`/tokens where it causes visible inconsistency).
3. WHERE interactive controls exist (buttons, inputs, links), the system SHALL present consistent sizing, focus states, and hover states per the design system.
4. WHEN pages are viewed on mobile and desktop breakpoints, THEN layouts SHALL be responsive without overflow or broken spacing.

### Requirement 4 — Performance & Core Web Vitals

**User Story:** As a visitor, I want pages to load fast, so that I don't bounce and search ranking isn't penalized.

#### Acceptance Criteria
1. WHERE large client components exist (e.g. the hero section), the system SHALL minimize client-side JavaScript and avoid unnecessary "use client" boundaries.
2. WHEN images render, THEN they SHALL use optimized loading (next/image or equivalent) with correct dimensions/`sizes` and lazy-loading below the fold.
3. WHEN a production build runs, THEN there SHALL be no blocking build errors, and bundle size regressions SHALL be identified.
4. WHERE render-blocking or unused resources are found, the audit SHALL note them for remediation.

### Requirement 5 — Accessibility (a11y)

**User Story:** As a user relying on assistive technology, I want the site to be usable, so that I can navigate and understand all content.

#### Acceptance Criteria
1. WHERE icon-only buttons/controls exist, the system SHALL provide accessible names (aria-label/title).
2. WHEN images convey meaning, THEN they SHALL have descriptive `alt` text; decorative images SHALL have empty alt.
3. WHERE interactive elements exist, they SHALL be keyboard-operable and have visible focus indicators.
4. WHERE color is used to convey state, contrast SHALL meet WCAG AA where feasible, and the audit SHALL flag low-contrast cases.
5. WHEN forms render, THEN inputs SHALL have associated labels.

> Note: full WCAG conformance requires manual assistive-technology testing; this spec covers programmatically detectable issues and common patterns.

### Requirement 6 — Data Integrity & CMS Correctness

**User Story:** As an admin, I want the CMS to save and render content reliably, so that what I edit is what visitors see.

#### Acceptance Criteria
1. WHEN an admin saves any CMS section, THEN the change SHALL persist and the corresponding public page(s) SHALL revalidate/reflect it.
2. WHERE CMS content has defaults/fallbacks, the system SHALL merge them so a missing field never breaks a page.
3. WHERE `auth.users` and the `admin` table diverge (orphaned or non-admin accounts), the audit SHALL document the reconciliation needed (owner action for deletions).
4. WHEN a blog or content item is created/edited, THEN its AEO metadata (AI snapshot/FAQ) SHALL persist and render.

### Requirement 7 — Reliability, Error Handling & Monitoring

**User Story:** As the site owner, I want failures to be handled gracefully and observable, so that issues don't break pages or go unnoticed.

#### Acceptance Criteria
1. WHEN a server/CMS error occurs in production, THEN the UI SHALL show a safe message (no stack traces/internals) while dev shows details.
2. WHERE external calls (Supabase, AI, storage) can fail, the system SHALL catch errors and return user-friendly messages without crashing the page.
3. WHEN analytics/monitoring is configured, THEN page views and performance SHALL be captured; error monitoring setup SHALL be documented (owner provides DSN).
4. WHERE forms submit, THEN validation SHALL reject malformed/oversized input.

### Requirement 8 — Code Quality & Maintainability

**User Story:** As a developer, I want the codebase to be type-safe and consistent, so that future changes are safe and fast.

#### Acceptance Criteria
1. WHEN `tsc --noEmit` and the production build run, THEN there SHALL be zero type errors and zero build errors.
2. WHERE duplicate logic exists (e.g. two image-upload paths, repeated auth blocks), the audit SHALL note consolidation opportunities.
3. WHERE dead code, unused files, or stray artifacts exist (e.g. `extracted_zip/`, scratch files), the audit SHALL flag them.
4. WHERE lint issues exist, they SHALL be identified and, where low-risk, fixed.

---

## Prioritization
Findings will be triaged in Design by severity: **P0 (security/data-loss/broken page) → P1 (SEO/perf/a11y with user impact) → P2 (consistency/quality)**. Fixes in Tasks will be ordered P0 → P2, with each fix verified (build/type-check/live check) before moving on.