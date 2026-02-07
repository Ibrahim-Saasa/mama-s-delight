

# Cuisine Pages + Fun Facts Enhancement

## Overview
Add fun facts to the homepage cuisine cards AND create dedicated detail pages for each cuisine with rich history, cultural context, and signature dishes -- all in the witty BiteSide Story tone.

---

## Part 1: Homepage Cuisine Cards - Quick Fun Facts

Update the `CuisinesSection` component to show a short fun fact beneath each cuisine card.

Each cuisine gets a bite-sized fact, for example:
- **Chinese**: "Chinese cuisine has over 5,000 years of history -- older than chopsticks themselves!"
- **Mexican**: "Mexico gave the world chocolate. You're welcome, dessert lovers."
- **Indian**: "India uses over 30 different spices -- talk about a flavor glow-up!"
- **Middle Eastern**: "Hummus has been around since the 13th century. OG snack."

The cards will also become clickable links that navigate to the dedicated cuisine detail page.

---

## Part 2: Dedicated Cuisine Detail Pages

Create a new `/cuisine/:slug` route (e.g., `/cuisine/chinese`) with a rich detail page for each cuisine.

### Page Content per Cuisine:
- **Hero banner** with the cuisine image and a punny tagline
- **History section** -- a short, engaging origin story
- **Fun Facts** -- 4-5 quirky facts presented in styled cards
- **Signature Dishes** -- highlight 3-4 iconic dishes with descriptions
- **"Order Now" CTA** linking to the menu page filtered by that cuisine

### Data Approach:
All content will be stored as static data in a constants file (`src/data/cuisineDetails.ts`) -- no database changes needed. This keeps it simple and fast.

---

## Technical Details

### New Files
1. **`src/data/cuisineDetails.ts`** -- Static data for all 4 cuisines (history, fun facts, signature dishes, cultural tidbits)
2. **`src/pages/CuisineDetail.tsx`** -- The detail page component with sections for history, facts, and dishes

### Modified Files
1. **`src/components/CuisinesSection.tsx`** -- Add fun fact text below each card, wrap cards in `Link` to `/cuisine/:slug`
2. **`src/App.tsx`** -- Add route for `/cuisine/:slug`

### Component Structure for Detail Page
- Reuses existing UI components (Card, Badge) and Lucide icons
- Follows the same background pattern and styling as other pages
- Includes Header and Footer for consistency
- Fun facts displayed as a grid of small cards with Lucide icons
- Signature dishes section mirrors the menu card style

