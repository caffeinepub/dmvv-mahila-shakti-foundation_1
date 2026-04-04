# DMVV Mahila Shakti Foundation

## Current State
The app is a large React frontend with 50+ pages (admin, user, public). All dynamic content (gallery, news, schemes, settings, team, partners, complaints, etc.) is stored in `localStorage`. This means admin updates ONLY appear on the admin's device -- other users (especially APK installs) see no updates.

Backend currently only has blob-storage (file uploads) + user-approval + authorization. No content storage in Motoko.

## Requested Changes (Diff)

### Add
- Motoko stable storage for ALL content types: SiteSettings, News, Gallery, Training, Centers, Schemes, Employment, LoanTypes, Rewards, Downloads, LegalDocuments, Wishes, ImpactStories, Leadership, FoundationEvents, ComputerCenters, CommunityCenter, Transport, Team, Partners, Complaints, FranchiseMachines, FranchiseRawMaterials, FranchiseBlueprint, FranchisePlans, LoanApplications, Products, Volunteers, YouTubeVideos, CoreInitiatives
- Motoko CRUD functions for each content type
- Motoko user authentication: login (email+password hash), session tokens, user profiles, KYC
- Frontend `BackendService` utility that wraps backend calls with localStorage fallback simulation
- Language translation: Google Translate widget or i18n with full page translation

### Modify
- AppContext to read/write from backend canister instead of localStorage
- All admin pages to call backend save/load functions
- All public pages to load data from backend
- LanguageSwitcher to actually translate page content

### Remove
- Dependency on localStorage for content persistence (use it only for session caching)

## Implementation Plan
1. Extend Motoko main.mo with all content storage functions (stable vars, CRUD)
2. Add user auth (login, register, session management)
3. Update backend.d.ts with all new types
4. Create a BackendDataService.ts that provides read/write for all content types using the Motoko backend
5. Update AppContext to use BackendDataService
6. Update all admin pages to save to backend
7. Update all public pages to load from backend
8. Fix language switcher to use Google Translate integration
