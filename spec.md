# DMVV Mahila Shakti Foundation — Franchise Partners CRM

## Current State
- Franchise public page exists at `/franchise` with apply form.
- AdminFranchise page manages machines, rates, blueprints, applications (approve/reject/forward/letters).
- No dedicated Franchise Partner login or dashboard exists.
- AppContext has User roles: user/center/supervisor/transport/admin/hr. No 'franchise' role.
- AdminLayout sidebar has no Franchise Partners management entry.
- RoleLogin page shows 6 roles but no franchise partner tile.

## Requested Changes (Diff)

### Add
- New role: `franchise` added to User type (role union)
- `FranchisePartner` extended profile type: business name, category, plan, investment amount, joining date, territory/area, commission rate, status, profile photo, documents, assigned supervisor, notes
- `FranchiseLetter` type: letter type (approval/welcome/renewal/forward/custom), content, date, sentBy, attachmentUrl
- `FranchiseService` type: service request title, description, status, date, admin response
- `FranchisePartnerLogin` page at `/franchise-partner/login` — dedicated login with branding
- `FranchisePartnerDashboard` at `/franchise-partner/dashboard` with tabs:
  1. **Overview** — stats (earnings, orders, commission), recent activity
  2. **Profile** — view & edit personal/business details, upload photo from gallery
  3. **My Letters** — view approval, welcome, renewal, forwarded letters; download option
  4. **Services** — raise service request, track status, view admin responses
  5. **Documents** — uploaded KYC docs, certificates
  6. **Business** — business targets, performance tracker
- `AdminFranchisePartners` page at `/admin/franchise-partners` — full CRUD:
  - List all approved franchise partners with search/filter
  - Edit partner profile, update status, upload photo from gallery
  - Generate & send letters (Approval, Welcome, Renewal, Forward, Custom)
  - Add admin notes
  - View all service requests from partners with respond option
  - View partner documents
- Route `/franchise-partner/login` and `/franchise-partner/dashboard` added to App.tsx
- AdminLayout sidebar: new entry "Franchise Partners" with icon
- RoleLogin page: new tile for "Franchise Partner"
- When admin approves a franchise application (in AdminFranchise), option to "Create Partner Account" that adds user with role 'franchise'

### Modify
- `User` type: add `franchise` to role union, add `businessName`, `franchiseCategory`, `franchisePlan`, `franchiseJoiningDate`, `franchiseTerritory`, `franchiseCommissionRate`, `franchiseStatus` optional fields
- `AppContext`: add `franchisePartners` state, `franchiseLetters` state, `franchiseServices` state with full CRUD actions + backend sync
- `AdminFranchise.tsx`: in Applications tab, add "Create Partner Account" button on approved applications
- `RoleLogin.tsx`: add Franchise Partner tile

### Remove
- Nothing removed

## Implementation Plan
1. Update User type in AppContext + add new interfaces (FranchiseLetter, FranchiseService, FranchisePartnerProfile)
2. Add state + CRUD + backend sync for franchiseLetters and franchiseServices in AppContext
3. Create `FranchisePartnerLogin.tsx` page
4. Create `FranchisePartnerDashboard.tsx` with 6 tabs (Overview, Profile, Letters, Services, Documents, Business)
5. Create `AdminFranchisePartners.tsx` with full list, edit, letter generation, service response
6. Update App.tsx — add new routes
7. Update AdminLayout.tsx — add sidebar nav entry
8. Update RoleLogin.tsx — add franchise partner tile
9. Update AdminFranchise.tsx — add "Create Partner Account" on approved applications
10. Validate build
