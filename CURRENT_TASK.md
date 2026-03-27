# Air Gadgets — Current Task

## Active: Phase 1 — Foundation (COMPLETED ✅)

### Status
- [x] Spec written (SPEC.md)
- [x] Logo copied to assets/ and public/
- [x] Next.js 15 scaffold with TypeScript
- [x] Tailwind CSS v4 + shadcn/ui setup
- [x] Prisma schema + DB connection (SQLite for dev)
- [x] NextAuth admin auth (credentials-based)
- [x] Basic layout (navbar + footer with logo)
- [x] Starfall hero section on homepage
- [x] Featured products + categories sections
- [x] Cart context + cart drawer
- [x] All storefront pages scaffolded
- [x] All admin pages scaffolded
- [x] All API routes created
- [x] Database seeded (1 admin, 6 categories, 8 products)
- [x] Build passes (32 routes, zero errors)

## Phase 2 — Admin Panel (IN PROGRESS)
- [ ] Test admin login flow
- [ ] Test product CRUD with image upload
- [ ] Test category management
- [ ] Test order management
- [ ] Wire up MinIO for image uploads (when NUC is back)

## Phase 3 — Storefront Polish
- [ ] Fix product images parsing on frontend
- [ ] Test product detail pages with specs
- [ ] Test category filtering
- [ ] Test search functionality

## Phase 4 — Cart & Checkout
- [ ] Test full checkout flow (COD)
- [ ] Order confirmation page
- [ ] Email notifications

## Phase 5 — Polish
- [ ] SEO, performance, mobile responsiveness

## Decisions
- SQLite for dev (NUC PostgreSQL was unreachable 2026-03-26)
- Will switch back to PostgreSQL for Railway deployment
- Railway deployment planned
- Cash on delivery only
- English only
- Dark theme with starfall-inspired hero

## Dev Server
- Port: 3099
- Command: `npx next dev --port 3099 --hostname 0.0.0.0`
- Admin login: admin@airgadgets.com / admin123

## Key Files Modified (2026-03-26)
- prisma/schema.prisma — switched to SQLite, removed PG-specific types
- prisma.config.ts — added datasource url, seed command
- prisma/seed.ts — uses better-sqlite3 adapter, JSON.stringify for arrays
- src/lib/prisma.ts — uses PrismaBetterSqlite3 adapter
- src/lib/helpers.ts — NEW: parseProduct/parseOrder helpers
- src/app/api/products/route.ts — removed mode:"insensitive", uses parseProduct
- src/app/api/products/[slug]/route.ts — uses parseProduct
- src/app/api/admin/products/route.ts — JSON.stringify for images/specs
- src/app/api/admin/products/[id]/route.ts — JSON.stringify for images/specs
- src/app/api/admin/orders/route.ts — local OrderStatus type (no enum import)
- src/app/api/orders/route.ts — JSON.stringify shippingAddress
