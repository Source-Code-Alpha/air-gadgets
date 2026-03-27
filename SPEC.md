# Air Gadgets — E-Commerce Platform Specification

## Overview
Full-stack e-commerce platform for selling high-tech home gadgets and smart home automation systems.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **ORM:** Prisma
- **Database:** PostgreSQL (NUC homelab: 192.168.1.43, user: meena, pass: Pg@2026!, db: airgadgets)
- **Auth:** NextAuth.js v5 (admin only for MVP)
- **File Storage:** MinIO (NUC: 192.168.1.43:9000, user: meena, pass: MinIO@2026!)
- **Deployment:** Railway
- **Payments:** Cash on Delivery (COD) only for MVP
- **Language:** English only

## Brand Identity
- **Primary Color:** #0080FF (blue from logo)
- **Secondary Color:** #2D2D2D (charcoal gray from logo)
- **Accent:** #00B4D8 (lighter blue for hover states)
- **Background:** Dark theme with gradient (#0a0a0a → #111827)
- **Typography:** Inter or Geist Sans (clean, modern sans-serif)
- **Logo:** Geometric "A" icon in circle + "air gadgets" wordmark

## Design Direction
- Starfall/animated light streak hero section (inspired by 21st.dev starfall-portfolio-landing)
- Dark, premium aesthetic with subtle animations
- Clean white cards for product displays against dark backgrounds
- Generous whitespace, large product imagery
- Apple Store / premium tech retailer vibe
- Mobile-first responsive design

## Database Schema

### Category
- id (UUID, PK)
- name (String)
- slug (String, unique)
- description (String?)
- image (String?)
- parentId (UUID?, FK → Category) — for subcategories
- createdAt, updatedAt

### Product
- id (UUID, PK)
- name (String)
- slug (String, unique)
- description (Text)
- shortDescription (String)
- price (Decimal)
- compareAtPrice (Decimal?) — for showing "was $X" strikethrough
- sku (String, unique)
- stock (Int, default 0)
- images (String[]) — array of MinIO URLs
- specs (JSON) — key-value pairs for specifications
- featured (Boolean, default false)
- active (Boolean, default true)
- categoryId (UUID, FK → Category)
- createdAt, updatedAt

### Order
- id (UUID, PK)
- orderNumber (String, unique, auto-generated)
- status (Enum: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- paymentMethod (String, default "COD")
- paymentStatus (Enum: PENDING, PAID, REFUNDED)
- subtotal (Decimal)
- shippingCost (Decimal)
- total (Decimal)
- notes (String?)
- customerName (String)
- customerEmail (String)
- customerPhone (String)
- shippingAddress (JSON) — { street, city, state, zip, country }
- createdAt, updatedAt

### OrderItem
- id (UUID, PK)
- orderId (UUID, FK → Order)
- productId (UUID, FK → Product)
- quantity (Int)
- unitPrice (Decimal)
- total (Decimal)

### Admin
- id (UUID, PK)
- email (String, unique)
- password (String, hashed)
- name (String)
- role (Enum: SUPER_ADMIN, ADMIN)
- createdAt, updatedAt

### Review (Phase 2)
- id, productId, customerName, customerEmail, rating (1-5), comment, approved, createdAt

## Pages & Routes

### Storefront (Customer-Facing)
- `/` — Homepage (hero with starfall animation, featured products, categories, newsletter)
- `/products` — All products with filters (category, price range, sort)
- `/products/[slug]` — Product detail (image gallery, specs, add to cart, related products)
- `/category/[slug]` — Category page with filtered products
- `/cart` — Shopping cart
- `/checkout` — Checkout form (shipping info, order summary, place order)
- `/order/[orderNumber]` — Order confirmation/tracking
- `/about` — About Air Gadgets
- `/contact` — Contact form

### Admin Dashboard (`/admin`)
- `/admin` — Dashboard (stats: orders, revenue, top products)
- `/admin/products` — Product list with search, filter, bulk actions
- `/admin/products/new` — Add new product
- `/admin/products/[id]/edit` — Edit product
- `/admin/categories` — Category management
- `/admin/orders` — Order list with status filters
- `/admin/orders/[id]` — Order detail & status update
- `/admin/settings` — Store settings (name, shipping rates, etc.)

## Key Components

### Layout
- Navbar (logo, search, categories dropdown, cart icon with count)
- Footer (links, newsletter, social media, copyright)
- Admin Sidebar (navigation for admin sections)

### Storefront Components
- HeroSection — Starfall animated background, headline, CTA
- ProductCard — Image, name, price, add-to-cart button
- ProductGrid — Responsive grid of ProductCards
- ProductGallery — Image carousel/gallery on detail page
- CategoryCard — Image, name, product count
- CartDrawer — Slide-out cart sidebar
- FilterSidebar — Category, price range, sort filters
- SearchBar — Full-text product search

### Admin Components
- StatsCards — Revenue, orders, products counts
- DataTable — Sortable, filterable tables for products/orders
- ProductForm — Full product editor with image upload
- OrderTimeline — Visual status progression
- ImageUpload — Drag & drop to MinIO

## API Routes

### Public
- GET /api/products — List products (with pagination, filters)
- GET /api/products/[slug] — Single product
- GET /api/categories — List categories
- POST /api/orders — Create order (checkout)
- GET /api/orders/[orderNumber] — Order status (by orderNumber + email)

### Admin (protected)
- CRUD /api/admin/products
- CRUD /api/admin/categories
- CRUD /api/admin/orders (+ status update)
- POST /api/admin/upload — Image upload to MinIO
- GET /api/admin/stats — Dashboard statistics

## Build Phases

### Phase 1 — Foundation ✏️
- Next.js 15 scaffold with TypeScript
- Tailwind + shadcn/ui setup
- Prisma schema + PostgreSQL connection
- NextAuth admin authentication
- Basic layout (navbar, footer)
- Logo integration

### Phase 2 — Admin Panel
- Admin dashboard with stats
- Product CRUD with image upload
- Category management
- Order management

### Phase 3 — Storefront
- Homepage with starfall hero
- Product catalog with filters
- Product detail pages
- Category pages

### Phase 4 — Cart & Checkout
- Shopping cart (localStorage + context)
- Checkout flow with COD
- Order confirmation
- Email notifications (via Mailpit for dev)

### Phase 5 — Polish
- Search functionality
- SEO optimization (meta tags, sitemap, structured data)
- Performance optimization (image optimization, lazy loading)
- Error handling & loading states
- Mobile responsiveness fine-tuning
