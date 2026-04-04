# DMVV Mahila Shakti Foundation

## Current State
- Signup form saves data to `users` array via `addUser` in AppContext
- AdminUsers page shows all users with edit/update capability
- AdminLoanApplications page shows all loan applications with approve/reject
- AdminLoan page has a shareable loan apply link with "Copy Link" button
- No dedicated "Signup Submissions" view with shareable signup link in admin

## Requested Changes (Diff)

### Add
- **Shareable Signup Link** in AdminUsers page: a prominent green/blue box at the top showing the signup page URL with "Copy Link" button -- same style as the loan link in AdminLoan
- **Signup Submissions Tab/Section**: In AdminUsers, add a "New Registrations" highlight -- show pending signups at top with all submitted form fields visible (Name, Mobile, Email, Role, Father's Name, DOB, Gender, Address, District, State, Pincode, Aadhaar, PAN, Nominee Name, Nominee Relation, createdAt)
- **Full Details Expand**: Each signup submission expandable to show all KYC/personal details submitted, with inline Edit + Approve/Reject buttons
- **Loan Applications Enhancement**: Add shareable loan apply link box to AdminLoanApplications page too (mirroring AdminLoan), full details visible for each loan application

### Modify
- AdminUsers: add shareable signup link box at top, improve pending registrations visibility with "New" badge and full form data display
- AdminLoanApplications: add shareable loan link box at top

### Remove
- Nothing removed

## Implementation Plan
1. Add shareable signup link box in AdminUsers (copy window.location.origin + /signup)
2. Enhance pending registrations display -- show all fields in expandable detail view
3. Add "New Registrations" tab as first tab in AdminUsers showing only pending with full data
4. Add shareable loan link box in AdminLoanApplications (same link as AdminLoan uses)
5. Ensure all edit/update options are accessible from the detailed view
