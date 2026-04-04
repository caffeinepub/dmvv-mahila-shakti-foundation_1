# DMVV Mahila Shakti Foundation

## Current State
The main page hero section uses a single static background image (`hero-women-empowerment.dim_1400x700.jpg`) with no slider. Admin dashboard has no image slider management.

## Requested Changes (Diff)

### Add
- `SliderImage` interface in AppContext with fields: `id`, `imageUrl`, `title`, `subtitle`, `isActive`, `sortOrder`
- `sliderImages` state array in AppContext (persisted to backend)
- CRUD functions: `addSliderImage`, `updateSliderImage`, `deleteSliderImage`
- Auto-looping image slider on Home page hero section replacing the static background
- Slider: full-width, auto-advances every 4 seconds, shows title/subtitle overlay, dots navigation, prev/next arrows, smooth crossfade or slide transition
- "Image Slider" tab in AdminHomePage with: upload image (base64 URL stored), set title/subtitle, toggle active/inactive, reorder, delete

### Modify
- `AppContext`: add interface, initial data (2 default slides using existing hero image + a second), state, useEffect for backend sync, CRUD functions, expose in context value
- `Home.tsx`: replace static hero section with dynamic slider component
- `AdminHomePage.tsx`: add "Image Slider" tab with full CRUD

### Remove
- Nothing removed

## Implementation Plan
1. Add `SliderImage` interface after `HomeHeroContent` in AppContext
2. Add initial slider images array (2 slides with existing hero image)
3. Add `sliderImages` state, backend sync useEffect, CRUD functions
4. Expose `sliderImages`, CRUD in context type and value
5. Build `HomeSlider` component inline in Home.tsx with auto-play, dots, arrows
6. Replace hero `<section>` with slider in Home.tsx
7. Add "Image Slider" tab to AdminHomePage with upload (FileReader base64), title/subtitle, active toggle, delete, reorder
