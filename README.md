# Benitez Cruz and Mazzochi portfolio

Next.js 16, Tailwind v4, Motion, Geist (self-hosted), Phosphor icons, Simple Icons.

    npm install
    npm run dev

## Adding your project images

Drop screenshots into `public/projects/` with these exact names, then rebuild. Any of .webp, .jpg, .png, .avif works. Missing files just show the empty slot.

    go-smartex   gobta   onesource-peo   prana-wealth   tribu-mkt
    hrlogics   heritage-health-network   marketing-mob   gem
    hero     (optional; falls back to go-smartex)
    studio   (optional; 4:5 portrait)

Suggested size: 1600x1000 for projects, 2400x1200 for the hero.

Names, sectors, links, and grid order live in `lib/content.ts`. The grid is a fixed 9-cell bento: keep 9 projects or change `cells` in `components/work-grid.tsx`.

## Before publishing

- Replace `studio.contactHref` in `lib/content.ts` with the real email.
- Confirm every line of copy in `lib/content.ts`, `hero.tsx`, `statement.tsx`, `studio.tsx`, and `contact.tsx`.
