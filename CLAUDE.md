# CLAUDE.md

Guidance for working in this repository.

## What this is

kurtkluth.dev is a **Docusaurus 3.10.2 + TypeScript** site: a personal
portfolio and documentation hub for Kurt Kluth's developer work (SQLCLR) and
the Kluth Studios browser games. Dark-first design, in the visual language of
sqlclr.com. It is a static site, no backend, no accounts.

Live at **https://kurtkluth.dev** (custom domain).

## Local development

- `npm start` — dev server with hot reload at `localhost:3000` (best for editing).
- `npm run build` — production build into `build/`. **Run this before pushing.**
  `onBrokenLinks` and `onBrokenAnchors` are set to `throw`, so a bad internal
  link fails the build. A green build is the strongest pre-deploy check.
- `npm run serve` — serve the built `build/` dir (this is what `.claude/launch.json`
  runs, on port 3000).

## Deploying

Deployment is automatic: **every push to `main`** runs
`.github/workflows/deploy.yml` (build Docusaurus, publish to GitHub Pages).
`test-deploy.yml` build-checks pull requests. A deploy takes ~1 minute.

Hosting is **GitHub Pages**; the custom domain is set via `CNAME` +
`static/CNAME` (`kurtkluth.dev`). DNS is proxied through **Cloudflare**, which
serves a valid TLS cert, so HTTPS works while proxied. `.dev` is HSTS-preloaded,
so HTTPS is mandatory. Do not delete the workflows, `CNAME`, or `LICENSE`.

**History quirk:** the local `master` branch has an *unrelated history* to
`origin/main` (the deploy branch) for legacy reasons. A plain `git push` of
`master` will not fast-forward `main`. To ship local commits, put their tree on
top of `origin/main` and push that:

```sh
git fetch origin main
C=$(git commit-tree "$(git rev-parse master^{tree})" -p origin/main -m "message")
git push origin "$C:refs/heads/main"
```

Prefer to keep changes to a clean, reviewable diff against `origin/main`.

## Editing the site

Two kinds of pages:

- **Custom React pages** — `src/pages/*.tsx`. Home (`index.tsx`), About
  (`about.tsx`), Projects (`projects/index.tsx` + per-project `projects/*.tsx`).
  Prose is embedded in JSX; apostrophes use HTML entities (`&rsquo;`).
- **Docs pages** — `docs/**/*.md`. Plain Markdown with `title`/`description`
  frontmatter. Sidebar structure in `sidebars.ts`.
- **Standalone Markdown pages** — `src/pages/*.md` become top-level routes
  (e.g. `terms.md` -> `/terms`). Used for the legal pages.

Cross-cutting:

- `src/data/projects.ts` — project metadata (name, summary, status, accent).
  One entry feeds the cards on Home, Projects, and About.
- `docusaurus.config.ts` — navbar, footer, site title/tagline.
- `src/css/custom.css` — global colors and design tokens.

## Gotchas and conventions

- **YAML frontmatter colons:** an unquoted `description:` value containing a
  second `: ` (colon-space) breaks the build (`bad indentation of a mapping
  entry`). Reword to drop the inner colon, or quote the value.
- **No em/en dashes** in prose. House style uses periods, commas, parentheses,
  and semicolons instead. Do not introduce `—` or `–`.
- **Contact email** is `kurt@kurtkluth.dev`.
- Line endings normalize to CRLF on Windows; the LF->CRLF git warnings are
  harmless.
- **Not tracked / gitignored:** `.claude/` (local tooling) and
  `CONTENT-INVENTORY.md` (working notes: design tokens and per-site facts;
  consult it locally before touching the design system, but it is not published).
