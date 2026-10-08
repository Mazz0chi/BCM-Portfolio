# Benitez Cruz Mazzochi portfolio

Next.js 16, Tailwind v4, Motion, Geist (self-hosted), Phosphor icons, Simple Icons.

    npm install
    npm run dev

## Adding your project images

Drop screenshots into `public/projects/` with these exact names, then rebuild. Any of .webp, .jpg, .png, .avif works. Missing files just show the empty slot.

    go-smartex   gobta   onesource-peo   prana-wealth   tribu-mkt
    hrlogics   heritage-health-network   marketing-mob   gem   jj-capinvest
    hero     (optional; falls back to go-smartex)
    studio   (optional; 4:5 portrait)

Suggested size: 1600x1000 for projects, 2400x1200 for the hero.

Redesign before/after slider: `public/projects/redesign-before.*` (old site) and
`public/projects/redesign-after.*` (new site), same size, ideally 1920x1080.

Client logos for the "trusted brands" row: `public/clients/<slug>.svg` (or .png/.webp),
using the project slugs above. Without a logo the client's name is shown instead.

Names, sectors, links, and grid order live in `lib/content.ts`. The grid is a fixed 10-cell bento: keep 10 projects or change `cells` in `components/work-grid.tsx`.

## Languages

English is served at `/`, Spanish at `/es`. All visible copy lives in `lib/i18n.ts`
(`es` is type-checked against `en`, so a missing string fails the build).
Project sectors are translated in `lib/content.ts`.
First-time visitors whose browser prefers Spanish are sent to `/es`; once someone
uses the EN/ES toggle, their choice is remembered.

## Before publishing

- Replace `studio.contactHref` in `lib/content.ts` with the real email.
- Confirm every line of copy in `lib/content.ts`, `hero.tsx`, `statement.tsx`, `studio.tsx`, and `contact.tsx`.
