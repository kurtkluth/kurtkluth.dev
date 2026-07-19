# New Game Playbook: Ship & Document a Kluth Studios Game

A reusable checklist for everything that happens **after the game code is
built**: hardening, deploying to Cloudflare, and documenting the game on
kurtkluth.dev.

Placeholders: `<game>` is the display name, `<slug>` is the kebab-case name
(e.g. `lisas-tapistry`), and the live URL is
`https://<subdomain>.kluthstudios.com`.

---

## 0. Decide the subdomain first

The canonical URL gets baked into the game's metadata at build time
(og:image, `metadataBase`, PWA manifest). Pick `<subdomain>.kluthstudios.com`
**before** the final production build so social and share links resolve. Make
it overridable via `NEXT_PUBLIC_SITE_URL`.

## 1. Harden the game repo

- [ ] Green gates: `typecheck`, `lint`, unit tests, e2e tests, and a
      **production build**.
- [ ] PWA assets present: `manifest`, service worker (registers off-localhost
      only, versioned cache), icons, and `og.png` (raster; unfurlers ignore
      SVG). Reuse the shared `tools/og-image.ps1` + `tools/icons.ps1`.
- [ ] `CLAUDE.md` and `README.md` accurate (commands, architecture, deploy,
      and the "main is protected" note).

## 2. Create the GitHub repo (game)

- [ ] `gh repo create KluthStudios/<slug> --private` (match the siblings:
      private).
- [ ] Add the remote, ensure the branch is `main`, push. **Never push `main`
      directly on an established repo; branch + PR.** The seed push on a
      brand-new empty repo is the one exception.

## 3. Cloudflare deployment config

- [ ] Add `wrangler.jsonc`: Workers static assets serving the build output
      dir, `not_found_handling: "404-page"`, and a `custom_domain` route for
      `<subdomain>.kluthstudios.com` (DNS + cert auto-provision because
      kluthstudios.com is already in the Cloudflare account).
- [ ] Add a `deploy` script (`build && wrangler deploy`).
- [ ] Deploy: `npx wrangler login` then `npm run deploy`, **or** connect the
      repo via Cloudflare Workers Builds (build command = the static build).
- [ ] Confirm it is live at the subdomain.

## 4. Document it on kurtkluth.dev (the main event)

The authoritative checklist lives in that repo's
`docs/guides/developer-guide.md` ("How a project gets added"). Keep these in
sync. Six steps:

1. [ ] **`src/data/projects.ts`** — one entry (name, slug, summary, lede,
       category, status, liveUrl, launchLabel, docsPath, technologies,
       featured, accentColor, studio, highlights, gettingStarted, updates).
       Pick a distinct `accentColor`. Drives the homepage grid, projects
       index, and About page automatically.
2. [ ] **`src/pages/projects/<slug>.tsx`** — the detail-page route (renders
       `<ProjectPage slug="<slug>" />`).
3. [ ] **`src/components/ProjectArt/index.tsx`** — an original self-contained
       SVG scene keyed by slug (used on card + hero; the frame is empty
       without it). Dark-friendly and on-brand.
4. [ ] **`docs/<slug>/`** — the six-page set: `overview`, `how-to-play`,
       `gameplay`, `tips`, `faq`, `changelog`.
5. [ ] **`sidebars.ts`** — add the category block (positioned to match the
       projects.ts ordering).
6. [ ] **Bump the hardcoded project/game counts** (grep the current count
       word):
       - `src/pages/index.tsx` (home terminal comment)
       - `src/pages/projects/index.tsx` (index lede)
       - `docs/index.md` (landing table + "the other N" line; add a table row)
       - `docs/getting-started.md` ("ships N browser games" + the list)
       - `docs/guides/how-to-play.md` (description, touch-support line, launch
         table, add a "jump in" section)

**House-style rules for the docs:** no em/en dashes (use periods, commas,
parentheses, semicolons); relative links between docs, absolute
`/projects/...` paths to the portfolio; `overview.md` is the canonical entry;
watch the YAML `description:` gotcha (a second `: ` breaks the build, so
reword or quote the value).

## 5. Build, review, ship (kurtkluth.dev)

- [ ] `npm run build` is the real gate (`onBrokenLinks` /
      `onBrokenAnchors: throw` catches every bad internal link).
- [ ] Verify in the browser: the project page, the docs + sidebar, and the
      games grid card.
- [ ] Branch, commit, push; open a **PR against `main`** (branch-protected).
      Wait for the required **"Test deployment"** check to pass, then merge.
      Merging triggers the GitHub Pages deploy (about a minute).
- [ ] Sync local `main` (`git pull`) and delete the merged branch.

## 6. Post-launch

- [ ] Once the game is live, add a dated **"Went live"** entry atop
      `docs/<slug>/changelog.md` (its own small PR, same flow).
- [ ] If anything new became a convention, write it down.

---

## Repo reference

- **Game repos:** `KluthStudios/<slug>` (private), branch `main` protected.
- **Portfolio/docs site:** `kurtkluth/kurtkluth.dev`, Docusaurus, branch
  `main` protected, required check "Test deployment", deploy on merge to
  GitHub Pages. Custom domain via Cloudflare DNS.
- **Shared tools:** `og-image.ps1` and `icons.ps1` (Windows GDI+, no deps),
  copied into each game's `tools/`.
