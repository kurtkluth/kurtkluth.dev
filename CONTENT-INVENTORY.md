# kurtkluth.dev: Content & Design Inventory

Captured live on 2026-07-18 from all six production sites. This file is the single
source of truth for the Fable 5 rebuild: design tokens, project facts, controls,
and the route map of the site being replaced.

## 1. Design language source: sqlclr.com

Kurt Kluth's personal site (SQL Server architect, San Clemente, CA). Built with Astro.
The new kurtkluth.dev must feel like part of this family.

### Extracted design tokens (verbatim from live CSS)

| Token | Value |
|---|---|
| `--bg` | `#07090d` |
| `--bg-raised` | `#0c0f15` |
| `--bg-card` | `#0e1219` |
| `--line` | `rgba(148, 163, 184, .12)` |
| `--line-strong` | `rgba(148, 163, 184, .22)` |
| `--text` | `#e7ecf3` |
| `--text-dim` | `#9aa7b8` |
| `--text-faint` | `#5c6a7d` |
| `--accent` | `#58a6ff` |
| `--accent-bright` | `#8ec6ff` |
| `--accent-deep` | `#1f6feb` |
| `--ember` | `#f0a35c` (restrained warm secondary) |
| `--glow-blue` | `rgba(31, 111, 235, .16)` |
| `--glow-ember` | `rgba(240, 163, 92, .07)` |
| `--font-sans` | `"Inter Variable", ui-sans-serif, system-ui, -apple-system, sans-serif` |
| `--font-serif` | `"Instrument Serif", ui-serif, Georgia, serif` |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "Cascadia Code", Consolas, monospace` |
| `--container` | `1120px` |
| `--section-pad` | `clamp(5rem, 12vw, 9rem)` |

### Observed patterns

- Dark-only, near-black `#07090d` page, raised panels `#0c0f15`, cards `#0e1219`.
- Hairline borders (`rgba(148,163,184,.12/.22)`) instead of shadows.
- Pill buttons: `border-radius: 999px`, bg `rgba(148,163,184,.04)`, 1px border `--line-strong`.
- H1: Inter var. weight ~640, tight letter-spacing (−0.035em), very large (~5.2rem).
- Overline labels in JetBrains Mono, uppercase, letterspaced ("THE STORY", "THE PRACTICE").
- Instrument Serif used as an elegant display accent.
- Ember `#f0a35c` used sparingly as the warm counterpoint to the blue.
- Contact: `kurtkluth@icloud.com` · GitHub: `github.com/kurtkluth`.

## 2. Site being replaced: kurtkluth.dev (Docusaurus v3.10.2)

Deployed 2026-07-18; light-first with teal accent. The reason for the rebuild is that
it does not feel like the SQLCLR family. Its structure and content are sound and are
carried forward.

### Route inventory (all preserved in the rebuild, no redirects needed)

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, featured grid, What I Build, Latest updates, About strip |
| `/projects` | All projects index |
| `/projects/sqlclr`, `/projects/lisa-climber`, `/projects/lisetris`, `/projects/skyroute`, `/projects/spindrift` | Project detail pages |
| `/about` | About Kurt / Kluth Studios |
| `/docs` → `/docs/getting-started` | Docs landing |
| `/docs/guides` (+ how-to-play, installation-setup, developer-guide, troubleshooting) | Cross-project guides |
| `/docs/sqlclr/*` | overview, quick-start, installation, configuration, core-concepts, examples, security, deployment, troubleshooting, faq, changelog |
| `/docs/{game}/*` | per-game docs, `overview` entry point |

### Existing copy worth carrying forward

- Hero: "Software, games, and experiments built by Kurt Kluth." / subtitle "Developer
  tools, browser games, and web experiments, with the documentation to launch,
  understand, and use every one of them." / CTAs "Explore Projects" + "Read the Docs".
- Featured section: "Every project ships with a live site and its own documentation."
- What I Build: Developer Tools / Games / Web Experiments (with the SQLCLR, Kluth
  Studios, experiments blurbs).
- About: "I build software for the fun of it. Developer tooling by day, browser games
  and experiments under the Kluth Studios banner. This site is the home for all of it:
  launch any project, then read how it works."
- Getting-started framing: portfolio + documentation + instructions; three user paths
  (SQLCLR users / players / troubleshooting); browser requirements.
- Changelog entries (2026-07-18): each project joined kurtkluth.dev.

## 3. Project facts (captured from each live site)

### SQLCLR: sqlclr.com, Developer Tool, Active, accent `#58a6ff`

- Positioning: "Some engineers work near the database. I work inside it."
- 25 years at the engine boundary; three eras: xp_ DLLs / ODS API (1998 to 2005), CLR
  integration & PERMISSION_SET (2005 to 2016), CLR strict security + Linux/containers
  (2017 to today). "signed · audited · win + linux + k8s".
- Practice areas: governed extensibility, hardened execution boundaries, cross-platform
  logic, legacy xp_ migration, performance at the boundary (streaming TVFs, custom
  aggregates), architecture & review.
- Canonical example: `CREATE ASSEMBLY … WITH PERMISSION_SET = SAFE;` then
  `CREATE PROCEDURE … AS EXTERNAL NAME …`.
- Object types docs cover: scalar functions, streaming TVFs, stored procedures,
  user-defined aggregates, user-defined types.
- When to use: compute-heavy row-by-row work (parsing, regex, custom aggregation);
  when NOT: plain data access, where set-based T-SQL wins.
- Tech tags: SQL Server, .NET, C#, T-SQL.

### Lisa Climber: lisaclimber.kluthstudios.com, Game, Active, accent ice blue `#8ecbff`

- In-game title: **Summit Smash**. "An original browser-based arcade climbing platformer."
- Pixel-art vertical platformer, page bg `#0b0e1a`, theme color `#0A1018`.
- Observed HUD: stage name "FROSTPEAK 1/6" (6 stages), "LAYER 0/8" (8 layers per
  stage), three hearts (lives), score with multiplier (×2), demo attract mode
  "PRESS ANY KEY / TAP TO PLAY" (keyboard + touch).
- Observed gameplay: brick/ice/water/grass platforms, icicle hazards, patrolling
  critters, collectible gems and money bags, lava-red kill floor at the bottom.

### Lisetris: lisetris.kluthstudios.com, Game, Active, accent neon pink `#ff5fa8`

- "A romantic neon falling-block puzzle game, made for Lisa." Deep purple `#2b0f3a`
  (theme `#2B0F3A`), glowing pink heart of blocks.
- Dedication: "Lisa, every piece of my life fits better because of you. I made this
  game with every piece of my heart." Tagline: "Piece by piece, everything falls into
  place."
- Modes: **Classic** ("Speed rises as you clear rows. Play until the well tops out.")
  and **Relaxed**. Menu: Play, Love Story, Statistics, Dedication, Settings, Credits.
- Controls: `←/A · →/D` move · `↓/S` soft drop · `Space` hard drop · `↑/X` rotate ·
  `Z` rotate back · `C/Shift` hold · `P/Esc` pause · `M` mute.

### Skyroute: skyroute.kluthstudios.com, Interactive Experience, Experimental, accent sky blue `#5ab1ff`

- In-game title: **SkyRoute Infinite** (by "Team Stealth"). "An original open-world
  browser flight simulator." "Open-world flight, straight from your browser. No
  downloads, no DLC, just wings." Bg `#0a1020`, theme `#0B1420`.
- Aircraft: **SL-9 Skylark** (piston trainer, forgiving, cruise 110 kt) and
  **SwiftJet 100** (regional twin-jet, fast and slippery, cruise 250 kt).
- Regions & airport pairs: Verdant Coast MER (Meridian Intl) ⇄ SKY (Skyhaven
  Regional); Amber Mesa DST (Dustline Field) ⇄ MVM (Mesa Verde Muni), "density
  altitude country"; Granite Range ALP (Alpine Base) ⇄ SUM (Summit Ridge), thin air;
  Azure Atoll CKY (Coral Key) ⇄ LGI (Lagoon Isle), short strips.
- Weather: Clear, Scattered, Cloudy, Overcast, Foggy, Rain, Stormy, Crosswind.
  Time: Day, Sunset, Night. Realism: Arcade, Assisted, Realistic, Custom.
  Graphics: High detail / Fast. Features: Logbook, sound toggle.
- Flight controls: `↓/↑` pitch (↓ = stick back) · `←/→` roll · `A/D` rudder &
  nosewheel · `W/S` throttle · `F/⇧F` flaps · `G` gear · `B` brakes · held `S`
  reverse thrust (jets, runway, idle).
- Systems: `P` autopilot (holds alt + follows route) · `Tab` cycle AP target
  (SPD/HDG/ALT/V/S) · `[/]` adjust target · `,/.` heading bug ±10° · `N/O` re-arm
  NAV / arm APR (ILS-style) · `C` chase/cockpit camera · `M` minimap · `V` sound ·
  `Esc` pause.
- Flight tips (from in-game): takeoff, brakes off (B), full throttle (W), rotate at
  ~65 kt; land gently "on the numbers", descent under ~300 fpm at touchdown for a
  high score.

### Spindrift: spindrift.kluthstudios.com, Interactive Experience, Experimental, accent vector white `#e8f1f8`

- In-game title: **SPINDRIFT**, "a vector-style arcade space shooter" (Asteroids
  homage). Pure black bg, white vector outlines, monospace type, glow effect.
- Controls: `←/→` rotate · `↑` thrust · `Space` fire · `Shift` hyperspace · `P` pause ·
  `M` mute · `G` glow toggle · `F` fullscreen. Touch supported ("M9 · TOUCH" badge).
- Scoring: rocks 20 / 50 / 100 (by size), saucers 200 / 1000, bonus ship at 10,000.
  Persistent high score ("HI").

## 4. Shared facts

- All Kluth Studios games: play in the browser, no install, no account, free.
- Requirements: current Chrome / Edge / Firefox / Safari, desktop or mobile
  (Spindrift + Lisa Climber + Lisetris have touch support; SkyRoute is best with a
  keyboard).
- GitHub: `github.com/kurtkluth` · Contact: `kurtkluth@icloud.com`.
- Kluth Studios = the games/experiments banner; SQLCLR = the serious developer tool.
