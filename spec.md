# DMVV Mahila Shakti Foundation

## Current State
Admin dashboard has User Management (AdminUsers.tsx) with basic edit, approve/reject, verify, delete. User interface has: id, fullName, mobile, email, password, role, status, createdAt, isVerified. No access code, no full profile fields, no ID card/certificate/promotion system.

## Requested Changes (Diff)

### Add
- `accessCode` field on User (auto-generated 6-char alphanumeric, admin can reset/change)
- `isLoginActive` field on User (admin can enable/disable login)
- Extended profile fields: fatherName, dob, address, district, state, pincode, photo
- Promotion history array per user: [{ id, fromRole, toRole, date, letter }]
- Achievement certificates array per user: [{ id, title, description, issuedDate, awardedBy }]
- **AdminLoginManagement** page (`/admin/login-management`):
  - Table: all users with Login ID (email), Access Code, role, status, isLoginActive
  - Per-user: change access code (manual or auto-generate), toggle active/inactive login
  - Search/filter by name, email, role
- **AdminUserFullProfile** page (`/admin/user-profile/:userId`):
  - Full profile form: photo, name, dob, father, mobile, address, role, status
  - ID Card generator: printable card with photo, name, role, ID, access code, org name/logo
  - Membership Certificate: printable certificate with name, role, date joined, org details
  - Achievement Certificate: add/view/print achievement certs per user
  - Promotion: add promotion (from role -> to role), auto-generate promotion letter with org letterhead
  - Print/download options for all documents

### Modify
- AdminLayout nav: add "Login Management" and access to User Full Profile from user list
- AdminUsers: add button to open Full Profile page per user
- AppContext User interface: extend with new fields
- App.tsx: add routes for new pages

### Remove
- Nothing removed

## Implementation Plan
1. Extend User interface in AppContext with accessCode, isLoginActive, fatherName, dob, address, district, state, pincode, photoUrl, promotions[], achievementCerts[]
2. Update initialUsers seed data with new fields
3. Create AdminLoginManagement.tsx
4. Create AdminUserFullProfile.tsx with ID card, certificates, promotion letter
5. Update AdminLayout nav
6. Update AdminUsers to link to full profile
7. Update App.tsx routes
