# kurtkluth.dev

Portfolio and documentation hub for software, games, and experiments built by
Kurt Kluth and Kluth Studios. Built with [Docusaurus](https://docusaurus.io/)
3.10.2 (TypeScript, React 19, Docusaurus v4 future flags enabled).

The design system is extracted from [sqlclr.com](https://sqlclr.com). It is
dark-first, with near-black surfaces, hairline borders, and a cool blue accent
with a warm ember counterpoint. Fonts are Inter Variable, Instrument Serif,
and JetBrains Mono (all self-hosted).

## Commands

```bash
npm install       # install dependencies
npm run start     # dev server with live reload
npm run build     # production build into build/ (link + anchor checks throw)
npm run serve     # serve the production build locally
npm run typecheck # TypeScript check
```

## Structure

| Path | Purpose |
|---|---|
| `src/data/projects.ts` | Single source of truth for every project (cards, detail pages, updates) |
| `src/components/` | Design-system components: ProjectCard, ProjectArt (SVG artwork), ProjectPage, StatusBadge, SectionHeading |
| `src/pages/` | Homepage, `/projects` index, five `/projects/<slug>` pages, `/about` |
| `src/css/custom.css` | Design tokens (`--kk-*`) mapped onto Infima; dark is the signature theme |
| `docs/` | Documentation: per-project sections + cross-project guides |
| `sidebars.ts` | One explicit sidebar; one category block per project |
| `CONTENT-INVENTORY.md` | Captured design tokens + content facts from all six live sites (2026-07-18) |

## Adding a project

Adding a project is a content task, not a redesign:

1. Add one entry to `src/data/projects.ts`.
2. Add artwork for its card in `src/components/ProjectArt/index.tsx`.
3. Create `src/pages/projects/<slug>.tsx` (three lines; it renders `ProjectPage`).
4. Create `docs/<slug>/` with the minimum set (overview, how-to-play or
   quick-start, gameplay/concepts, tips, faq, changelog).
5. Register the sidebar category in `sidebars.ts`.

The homepage grid, projects index, related-projects rows, and changelog feed
all pick the new project up from the metadata automatically.

## Deployment

`npm run build` emits a fully static site into `build/`, deployable on any
static host. Keep the previous production deployment available until the new
build passes a production-like check (see `docs/guides/developer-guide.md`).
