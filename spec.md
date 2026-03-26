# Delta Skydiving & Paragliding

## Current State
- IntroAnimation shows 'DELTA PARAGLIDING' as the brand line
- PackagesSection shows 3 paragliding packages with prices from PACKAGES constant
- ScrollParaglider shows a freefall figure that looks cartoon-like with basic box geometry

## Requested Changes (Diff)

### Add
- Two new seasonal skydiving package cards in PackagesSection (Everest Region Skydiving, Pokhara Skydiving) -- no price, badge 'SEASONAL', CTA is 'DM to Know More' linking to WhatsApp
- Seasonal packages use a different BookingButtons variant that shows only 'DM to Know More' WhatsApp button

### Modify
- IntroAnimation: change 'DELTA PARAGLIDING' line to 'DELTA SKYDIVING & PARAGLIDING'
- ScrollParaglider: completely rebuild the 3D figure to look like a recognizable skydiver with an open parachute canopy descending -- a dome-shaped canopy with suspension lines attached to a harness figure is instantly recognizable and realistic-looking vs a freefall stick figure

### Remove
- Nothing

## Implementation Plan
1. Update IntroAnimation.tsx: change 'DELTA PARAGLIDING' to 'DELTA SKYDIVING & PARAGLIDING'
2. Add 2 seasonal skydiving package entries to PACKAGES array in constants.ts with `seasonal: true`, no price, Everest and Pokhara
3. Generate skydiving images for the two new packages
4. Update PackagesSection.tsx to handle seasonal packages: show 'SEASONAL - DM TO KNOW MORE' badge, skip price display, show only WhatsApp DM button
5. Rebuild ScrollParaglider.tsx: replace freefall geometry with a parachute canopy (dome) + suspension lines + harness figure descending -- much more recognizable as skydiving
