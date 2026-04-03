# DMVV Mahila Shakti Foundation - Franchise Page

## Current State
The app has 20+ public pages and a full admin dashboard. No Franchise page exists yet. Admin layout has ~35 sidebar links. App.tsx has all routes defined.

## Requested Changes (Diff)

### Add
- Public page: `/franchise` — "Anshika Udhyog Centre" Franchise page with these sections:
  1. **Hero Banner** — Franchise heading, tagline, apply button
  2. **Machine Details** — Photo, name, description, rate/price (table/cards)
  3. **Raw Material Details** — Name, unit, rate per unit (table/cards)
  4. **Production Blueprint** — Step-by-step production process with diagram/flowchart style
  5. **Franchise Roadmap** — Timeline/steps to become a franchisee
  6. **Franchise Charge** — Investment breakdown: setup fee, royalty, other charges
  7. **Marketing Support** — What support franchisee gets (banner, branding, digital, etc.)
  8. **Franchise Plan** — Plans/tiers (Basic, Standard, Premium) with features and pricing
  9. **Product Packaging Details** — Product name, packaging type, size, weight, qty per box
  10. **All Udhyog Programs** — List of all industry programs under Anshika Udhyog Centre
  11. **Apply for Franchise** — CTA section with apply form (name, phone, district, state, message)
- Admin page: `/admin/franchise` — Full CRUD editor for every section of the Franchise page:
  - Machine details (add/edit/delete, photo upload)
  - Raw material details (add/edit/delete)
  - Production Blueprint steps (add/edit/delete)
  - Franchise Roadmap steps (add/edit/delete)
  - Franchise Charges (add/edit/delete)
  - Marketing Support items (add/edit/delete)
  - Franchise Plans (add/edit/delete, features list)
  - Product Packaging details (add/edit/delete)
  - Udhyog Programs (add/edit/delete)
  - Hero banner text edit
  - View franchise applications submitted
- Route `/franchise` added to App.tsx public routes
- Route `/admin/franchise` added to App.tsx admin routes
- "Franchise" nav link added to AdminLayout sidebar (with Store icon)
- Franchise link added to Header navigation menu (under More dropdown)

### Modify
- `App.tsx`: Add import + route for `FranchisePage` and `AdminFranchise`
- `AdminLayout.tsx`: Add `{ label: "Franchise Page", path: "/admin/franchise", icon: Store }` to adminNav
- `Header.tsx`: Add Franchise link in More dropdown

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/FranchisePage.tsx` — full public page, all sections, reads from localStorage
2. Create `src/frontend/src/pages/admin/AdminFranchise.tsx` — full admin CRUD, saves to localStorage
3. Update `App.tsx` — add routes
4. Update `AdminLayout.tsx` — add sidebar nav item
5. Update `Header.tsx` — add franchise in More dropdown
6. Validate (lint + typecheck + build)
