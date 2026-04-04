# DMVV Mahila Shakti Foundation

## Current State

The platform is a full-stack NGO management app (React + Motoko) with 20+ public pages, admin dashboard, and multi-role user system. The Home page includes: Hero Slider, Stats, About Preview, YouTube Videos, Government Schemes (hardcoded), Latest News, and CTA sections. The AdminHomePage manages hero content, stats, initiatives, CTA, and slider images. The Government Schemes section on Home page is currently hardcoded (not editable from admin). There is no Reviews/Testimonials section on the main page. There is no WhatsApp floating button anywhere on the site.

## Requested Changes (Diff)

### Add
1. **Reviews/Testimonials Section on Main Page** — A new section after News section showing user reviews with: star rating (1-5), reviewer name, profile avatar/initial, review text. Users can submit reviews from the main page (no login required). Reviews display as attractive cards.
2. **WhatsApp Floating Button** — Fixed floating button on all public pages. Clicking it opens WhatsApp with pre-filled message `Hi ANSHIKA UDHYOG GROUP` to number `8349600835`.
3. **Admin Reviews Management** — New `AdminReviews` page in admin dashboard with: view all reviews, edit (text, stars, name), update, delete. Accessible via Admin Dashboard sidebar. Reviews stored in AppContext with backend sync.
4. **Hero Section Admin Edit** — AdminHomePage already has hero edit. Ensure it is visible and fully functional with title, subtitle, button text edit options.
5. **Home Cards Admin Edit** — The Government Schemes section on Home page is currently hardcoded. Convert it to dynamic cards editable from admin dashboard: add/edit/delete cards with title, description, emoji icon, and **gallery image upload option** (pick from gallery or upload). Admin can manage these cards from AdminHomePage or a dedicated section.

### Modify
- `AppContext.tsx` — Add `Review` interface and `reviews` state with backend sync. Add `HomeCard` interface and `homeCards` state with backend sync.
- `Home.tsx` — Add Reviews section; replace hardcoded schemes cards with dynamic homeCards from context.
- `AdminHomePage.tsx` — Add HomeCards management tab with gallery image upload. Ensure Hero edit tab is prominent.
- `App.tsx` — Add route for AdminReviews if separate page, or integrate into AdminHomePage.
- All public pages/layout — Add WhatsApp floating button component.

### Remove
- Hardcoded Government Schemes array from Home.tsx (replace with dynamic homeCards).

## Implementation Plan

1. Add `Review` interface and `HomeCard` interface to AppContext. Add state variables `reviews`, `homeCards`. Wire backend sync for both.
2. Create `AdminReviews.tsx` page — table of all reviews, edit dialog (name, stars, text, isApproved toggle), delete with confirmation.
3. Add `WhatsAppButton.tsx` floating component — green circle with WhatsApp icon, fixed bottom-right, link to `https://wa.me/918349600835?text=Hi%20ANSHIKA%20UDHYOG%20GROUP`.
4. Add WhatsApp button to main layout (visible on all public pages).
5. Update `Home.tsx` — add Reviews/Testimonials section (star display, name, avatar/initial, text cards). Add a review submission form at the bottom of the section (name, stars, message). Replace hardcoded schemes section with dynamic `homeCards` from context, showing card image if available, else emoji icon.
6. Update `AdminHomePage.tsx` — add "Home Cards" tab for managing dynamic home cards (add/edit/delete, title, description, emoji, gallery image upload). Ensure Hero tab is clearly labeled and working.
7. Add AdminReviews route in App.tsx and sidebar link in AdminLayout.
