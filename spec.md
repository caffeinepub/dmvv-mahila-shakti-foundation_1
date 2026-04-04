# DMVV Mahila Shakti Foundation — Franchise Application System

## Current State
- `FranchisePage.tsx`: Franchise info page with machines, raw materials, plans, programs. Has a minimal apply form (only name, phone, district, state, message). No KYC fields, no passport photo, no document upload, no charges display, no popup message after submit.
- `AdminFranchise.tsx`: Admin panel with tabs for machines, raw materials, blueprint, plans, roadmap, charges, marketing, packaging, programs, applications. Applications tab shows basic card (name, phone, district, message) with NO approve/reject/forward, no letter generation, no KYC document viewer, no status management.
- Application data type: `{ id, name, phone, district, state, message, date }` — very limited.

## Requested Changes (Diff)

### Add
- **Franchise Apply Form** (in `FranchisePage.tsx`):
  - Section 1 — Basic Details: Full Name*, Father's Name*, Date of Birth*, Gender*, Phone*, Email*, Address*, District*, State*, Pincode*
  - Section 2 — KYC Documents: Aadhaar Number*, PAN Number*, Bank Account Number*, IFSC Code*, Bank Name
  - Section 3 — Document Upload: Aadhaar Card Upload (image/pdf)*, PAN Card Upload*, Passport Size Photo Upload*, Any additional document
  - Section 4 — Franchise Selection: Category/Type selection (from available programs), Investment Plan selection
  - Section 5 — Franchise Charges display: Show selected plan's franchise fee prominently before submit
  - **Submit Success Popup** (Modal): After form submission show a styled modal with:
    - "Application Submitted Successfully!"
    - Message: "Your franchise application has been received. After Franchise Fee Payment is confirmed, your application will be reviewed and approved by Admin. Your work process will begin within Minimum 7 days to Maximum 30 days."
    - Show franchise categories list
    - Contact info / next steps
    - Close button
- **Extended application data type**: `{ id, name, fatherName, dob, gender, phone, email, address, district, state, pincode, aadhaar, pan, bankAccount, ifsc, bankName, aadhaarDoc, panDoc, passportPhoto, additionalDoc, category, plan, status, date, approvedDate, rejectedDate, forwardedTo, adminNotes, kycStatus }`

- **Admin Dashboard `AdminFranchise.tsx` — Applications Tab full upgrade**:
  - Application list with status badges (Pending / Approved / Rejected / Forwarded)
  - Per application expandable detail card showing all submitted fields
  - KYC Documents section: view Aadhaar doc, PAN doc, passport photo inline
  - KYC Approval: "Approve KYC" / "Reject KYC" button with status badge
  - Action buttons: **Approve**, **Reject**, **Forward** (with forward-to field)
  - Letter Generation section:
    - **Generate Approval Letter** button (shows printable letter modal)
    - **Generate Rejection Letter** button  
    - **Generate Cancellation Letter** button
  - Admin Notes field (editable text)
  - Search/filter by status, name, date
  - Stats summary cards: Total, Pending, Approved, Rejected, Forwarded

- **Recruitment Page tab** in AdminFranchise: A "Recruitment" tab showing all approved franchise partners as a recruitment board — name, location, category, contact — printable list.

- **All Programs Set tab** in AdminFranchise: A "Programs" tab (may already exist) to set/edit available franchise program categories that appear in the apply form dropdown.

### Modify
- `FranchisePage.tsx`: Replace existing minimal apply form with the full multi-section application form above. Keep all existing page content (hero, machines, plans, etc.) intact — only the Apply section is replaced.
- `AdminFranchise.tsx`: Replace the Applications tab content with the full upgraded version. Add Recruitment tab.
- Backend data key `dmvv_franchise_applications` — update to store the new extended application object.

### Remove
- Remove the old 5-field apply form from FranchisePage.
- Remove the simple application card view (name/phone/district/message only) from AdminFranchise.

## Implementation Plan
1. Update `FranchisePage.tsx`:
   - Add multi-step form sections (Basic, KYC, Documents, Category/Plan) 
   - Add file upload inputs (passport photo, Aadhaar, PAN) stored as base64 in state
   - Display franchise charges/fee for selected plan
   - On submit: save extended application object to localStorage + backend
   - Show success popup modal with full message, categories list, timeline (7–30 days)
2. Update application data type in both files
3. Update `AdminFranchise.tsx` Applications tab:
   - Stats cards at top
   - Search + status filter
   - Expandable application cards with all details
   - KYC document viewer (image inline)
   - KYC approve/reject buttons
   - Approve/Reject/Forward action buttons
   - Letter generation modals (Approval, Rejection, Cancellation)
   - Admin notes
4. Add Recruitment tab in AdminFranchise
5. Ensure all text is in English (no Hindi hardcoded)
6. All changes saved to backend via BackendDataService
