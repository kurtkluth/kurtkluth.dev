# kurtkluth.dev

Portfolio and documentation hub for software, games, and experiments built by
Kurt Kluth and Kluth Studios — live at [kurtkluth.dev](https://kurtkluth.dev).

Built with [Docusaurus](https://docusaurus.io/) 3 (TypeScript, React 19,
Docusaurus 4 `future.v4` compatibility flags enabled).

## Development

```bash
npm install
npm run start      # dev server at http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build; broken links fail the build
npm run serve      # serve the production build locally
```

## Adding a project

Adding a project is a content task, not a redesign:

1. Add an entry to `src/data/projects.ts` (the single source of truth for
   cards, detail pages, filters, and footer links).
2. Drop 16:9 artwork at `static/img/projects/<slug>.svg`.
3. Create `docs/<slug>/` and register its category in `sidebars.ts`.

See the [Developer Guide](https://kurtkluth.dev/docs/guides/developer-guide)
for details.

## Deployment

Pushes to `main` build and deploy to GitHub Pages via
`.github/workflows/deploy.yml`. The `CNAME` file pins the custom domain.
