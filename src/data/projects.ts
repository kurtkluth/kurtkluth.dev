/**
 * Single source of truth for every project on kurtkluth.dev.
 *
 * The homepage grid, the projects index, each project detail page, and the
 * cross-links into the docs are all rendered from this file. Adding a project
 * here (plus its docs folder and sidebar group) is the entire integration.
 */

export type ProjectStatus = 'Active' | 'Experimental' | 'Archived';

export type ProjectCategory =
  | 'Developer Tool'
  | 'Game'
  | 'Interactive Experience';

export interface ProjectHighlight {
  title: string;
  body: string;
}

export interface ProjectStep {
  title: string;
  body: string;
}

export interface ProjectUpdate {
  date: string;
  text: string;
}

export interface Project {
  name: string;
  /** Title the app presents in-page when it differs from the project name. */
  inGameTitle?: string;
  slug: string;
  /** One-liner for cards. */
  summary: string;
  /** Lede paragraph for the detail page hero. */
  lede: string;
  category: ProjectCategory;
  status: ProjectStatus;
  liveUrl: string;
  /** Label for the primary launch action. */
  launchLabel: string;
  docsPath: string;
  repositoryUrl?: string;
  technologies: string[];
  featured: boolean;
  /** Per-project accent, used as a subtle tint on cards and heroes. */
  accentColor: string;
  studio: 'Kurt Kluth' | 'Kluth Studios';
  highlights: ProjectHighlight[];
  gettingStarted: ProjectStep[];
  updates: ProjectUpdate[];
}

export const PROJECTS: Project[] = [
  {
    name: 'SQLCLR',
    slug: 'sqlclr',
    summary:
      'Tooling and guidance for running .NET code inside SQL Server with the CLR integration.',
    lede:
      'A developer resource for SQL Server CLR integration. It covers writing, deploying, and operating .NET assemblies that run inside the database engine. Governed, verifiable, and built to survive security reviews and engine upgrades.',
    category: 'Developer Tool',
    status: 'Active',
    liveUrl: 'https://sqlclr.com',
    launchLabel: 'Open sqlclr.com',
    docsPath: '/docs/sqlclr/overview',
    technologies: ['SQL Server', '.NET', 'C#', 'T-SQL'],
    featured: true,
    accentColor: '#58a6ff',
    studio: 'Kurt Kluth',
    highlights: [
      {
        title: 'Governed extensibility',
        body: 'CLR assemblies with explicit permission sets, signing, and catalog-level trust. This is extensibility your DBAs approve of and your auditors can trace.',
      },
      {
        title: 'Every object type',
        body: 'Scalar functions, streaming table-valued functions, stored procedures, user-defined aggregates, and user-defined types, all as compiled .NET.',
      },
      {
        title: 'Security-first',
        body: 'CLR strict security from day one: signed assemblies, trusted-assembly allowlisting, and no TRUSTWORTHY shortcuts.',
      },
      {
        title: 'Cross-platform',
        body: 'One codebase for SQL Server on Windows, Linux, and Kubernetes. The same assembly deploys identically wherever the engine runs.',
      },
      {
        title: 'Worked examples',
        body: 'Complete C# and T-SQL for regex functions, streaming TVFs, and custom aggregates, with performance notes measured inside the engine.',
      },
      {
        title: 'Troubleshooting from the trenches',
        body: 'The real errors (6263, 10314, 6522) with causes and fixes, learned across twenty-five years at the engine boundary.',
      },
    ],
    gettingStarted: [
      {
        title: 'Visit sqlclr.com',
        body: 'The companion site covers the practice: who this is for and the story of the engine boundary.',
      },
      {
        title: 'Read the Quick Start',
        body: 'Enable CLR, build a minimal C# function, and call it from T-SQL in about ten minutes.',
      },
      {
        title: 'Deploy something real',
        body: 'Work through the examples (a regex scalar function, a streaming TVF, a custom aggregate), then read Security before production.',
      },
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'launched its documentation hub on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Lisa Climber',
    inGameTitle: 'Summit Smash',
    slug: 'lisa-climber',
    summary:
      'A browser climbing game. Guide Lisa up an ever-taller wall without falling.',
    lede:
      'An original browser-based arcade climbing platformer. Six pixel-art stages with eight layers each. Climb past icicles, critters, and crumbling footing, keep your hearts, and keep the score multiplier alive.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://lisaclimber.kluthstudios.com',
    launchLabel: 'Play Summit Smash',
    docsPath: '/docs/lisa-climber/overview',
    technologies: ['TypeScript', 'HTML5 Canvas', 'Web'],
    featured: true,
    accentColor: '#8ecbff',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Six stages, eight layers each',
        body: 'From Frostpeak upward, every stage is a tower of platform layers with its own hazards and look.',
      },
      {
        title: 'Classic arcade rules',
        body: 'Three hearts, a score multiplier that rewards steady collecting, and a kill floor that keeps you honest.',
      },
      {
        title: 'Pixel-art platforming',
        body: 'Brick, ice, water, and grass platforms; dropping icicles; patrolling critters; gems and money bags to grab on the way up.',
      },
      {
        title: 'Instant play',
        body: 'Loads in seconds, starts on any key or tap, and runs on desktop and mobile browsers alike.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: 'Summit Smash runs entirely in your browser. There is nothing to install and no account to make.',
      },
      {
        title: 'Press any key or tap',
        body: 'The demo attract screen hands over control the moment you do.',
      },
      {
        title: 'Climb',
        body: 'Read the how-to-play doc for the HUD, hazards, and scoring. Then chase the summit.',
      },
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Lisetris',
    slug: 'lisetris',
    summary:
      'A falling-block puzzle game in the browser. Clear lines, chase the high score.',
    lede:
      'A romantic neon falling-block puzzle game, made for Lisa. Classic mode speeds up as you clear rows; Relaxed mode lets you breathe. Piece by piece, everything falls into place.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://lisetris.kluthstudios.com',
    launchLabel: 'Play Lisetris',
    docsPath: '/docs/lisetris/overview',
    technologies: ['TypeScript', 'HTML5 Canvas', 'Web'],
    featured: true,
    accentColor: '#ff5fa8',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Two ways to play',
        body: 'Classic raises the speed as you clear rows and runs until the well tops out. Relaxed is for when you just want the glow.',
      },
      {
        title: 'Modern block-game controls',
        body: 'Soft drop, hard drop, both rotation directions, and a hold slot. The full contemporary control set.',
      },
      {
        title: 'A love letter',
        body: 'Built for Lisa, with a dedication, a Love Story mode, and a heart made of glowing blocks on the title screen.',
      },
      {
        title: 'Statistics',
        body: 'The game keeps your numbers (lines, scores, sessions) stored right in your browser.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: 'Lisetris runs in your browser. Free, no install, no account.',
      },
      {
        title: 'Pick Classic or Relaxed',
        body: 'Classic for the real test, Relaxed to unwind.',
      },
      {
        title: 'Learn the controls',
        body: 'Arrows or WASD, Space to hard drop, C to hold. The how-to-play doc has the full table.',
      },
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: "Lisa's Tapistry",
    slug: 'lisas-tapistry',
    summary:
      'A cozy tap-away mosaic puzzle in the browser. Clear the tiles, reveal the picture.',
    lede:
      'A cozy, mobile-first tap-away puzzle game. Every level hides a little stitched mosaic under a grid of arrow tiles. Tap a tile when the path ahead of its arrow is clear and it slides away, uncovering the picture beneath. Twelve hand-made levels, three boosters, and a warm craft-table look. Tap the path clear, reveal something wonderful.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://tapistry.kluthstudios.com',
    launchLabel: "Play Lisa's Tapistry",
    docsPath: '/docs/lisas-tapistry/overview',
    technologies: ['TypeScript', 'Next.js', 'PWA', 'Web'],
    featured: true,
    accentColor: '#f2755f',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Twelve levels, three collections',
        body: "Lisa's Little Garden eases you in, Cozy Corner turns up the thinking, and Wonder Cabinet brings the big, tricky mosaics. Every level is hand-made and guaranteed solvable.",
      },
      {
        title: 'One satisfying mechanic',
        body: 'Tap a tile and it flies off the board when its arrow has a clear path, revealing a piece of the hidden mosaic. Blocked tiles just wiggle and wait. The whole game is reading the board and clearing in the right order.',
      },
      {
        title: 'Boosters and hearts',
        body: 'Three boosters help when you are stuck: Thread Hint, Spool Sweep, and Needle Turn. Hearts only ever matter in the Wonder Cabinet challenges, and the rule is explained before it counts.',
      },
      {
        title: 'Cozy, accessible, installable',
        body: 'A warm craft-table look with beads, thread, and stitched edges. Full keyboard play, reduced-motion and high-contrast options, and it installs as an app and works offline.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: "Lisa's Tapistry runs in your browser, free, with nothing to install and no account. It is happiest on a phone but plays anywhere.",
      },
      {
        title: 'Play the tutorial',
        body: 'A short guided puzzle teaches the one rule in under a minute. You can replay it any time from Settings.',
      },
      {
        title: 'Clear the path',
        body: 'Work through the collections, earn stars and coins, and uncover every mosaic. The how-to-play doc has the details.',
      },
    ],
    updates: [
      {
        date: '2026-07-19',
        text: 'joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: "Lisa's Hexscape",
    slug: 'lisas-hexscape',
    summary:
      'A hexagonal tap-away puzzle in a twilight garden. Follow the arrows, find your way out.',
    lede:
      'A strategic hexagon puzzle set in an enchanted twilight garden. Every tile points to one of six neighbors; tap it when its path is clear and it slides away. Plan the order, match tiles to colored garden gates, thaw frost, spin turning hexes, and clear all 30 hand-made levels, plus a fresh deterministic daily puzzle. Follow the arrows. Find your way out.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://hexscape.kluthstudios.com',
    launchLabel: "Play Lisa's Hexscape",
    docsPath: '/docs/lisas-hexscape/overview',
    technologies: ['TypeScript', 'Next.js', 'PWA', 'Web'],
    featured: true,
    accentColor: '#b79ce8',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Six directions, one rule',
        body: 'Every hex points at one of its six neighbors and leaves only when its path is clear. The whole game is reading the board and choosing the right order.',
      },
      {
        title: 'Gates, frost, switches, and stones',
        body: 'Colored garden gates only accept matching tiles. Frosted hexes need thawing, turning hexes spin their neighbors, flower switches open and close gates, and stones never move. Each obstacle introduces itself before it counts.',
      },
      {
        title: 'Thirty solver-proven levels',
        body: "Three chapters (Twilight Trail, Moonlit Garden, Starlight Summit) climb from gentle to genuinely strategic. Every level is machine-verified solvable at par, without boosters, before it ships.",
      },
      {
        title: 'A daily bloom',
        body: 'One fresh puzzle a day, generated deterministically from the date and guaranteed solvable by construction. Same day, same puzzle, everywhere.',
      },
      {
        title: 'Relaxed or challenge',
        body: 'Relaxed levels have no move limit and allow undo. Challenge levels count every move, and four boosters (Lantern, Petal Turn, Starburst, Extra Moves) help when you are truly stuck.',
      },
      {
        title: 'Cozy, accessible, installable',
        body: 'Full keyboard play on a hex grid, color assistance badges, high contrast and reduced motion modes, and PWA installation with offline play.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: "Lisa's Hexscape runs in your browser, free, with nothing to install and no account. It plays beautifully on a phone or a desktop.",
      },
      {
        title: 'Play the tutorial',
        body: 'Three short guided boards teach arrows, blocked paths, gates, move limits, and boosters in about a minute. Replay it any time from Settings.',
      },
      {
        title: 'Find your way out',
        body: 'Clear the three chapters, chase three stars on every level, and come back each day for the Daily Bloom.',
      },
    ],
    updates: [
      {
        date: '2026-07-19',
        text: 'went live at hexscape.kluthstudios.com and joined the Kluth Studios collection.',
      },
    ],
  },
  {
    name: 'Diamond Dynasty',
    inGameTitle: 'Diamond Dynasty: Legends Rising',
    slug: 'diamond-dynasty',
    summary:
      'A baseball franchise sim in the browser. Build the roster, call the pitches, become a legend.',
    lede:
      'An original baseball franchise simulator. Play stat-driven three-inning matches where every at-bat is one decision (an approach at the plate, a pitch and location on the mound), earn coins, open scout packs, train your players, and raise your team rating. Build the franchise. Create the dynasty. Become a legend.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://diamonddynasty.kluthstudios.com',
    launchLabel: 'Play Diamond Dynasty',
    docsPath: '/docs/diamond-dynasty/overview',
    technologies: ['TypeScript', 'Next.js', 'PWA', 'Web'],
    featured: true,
    accentColor: '#e8c25a',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'One decision per at-bat',
        body: 'On offense pick an approach (Contact, Power, or Patient); on defense pick one of six pitch types and a location (Attack, Corner, or Waste). Approaches and pitches interact rock-paper-scissors style on top of real player ratings, so every choice matters and none of them takes longer than a breath.',
      },
      {
        title: 'A bullpen with consequences',
        body: 'Pitchers tire as they face batters; watch the PIT number drop and the TIRED tag appear. Each side gets exactly one call to the bullpen per game, and the AI manager knows when to pull a fading starter too.',
      },
      {
        title: 'Cards, packs, and training',
        body: 'A roster of procedurally generated player cards across six rarities. Scout Packs cost 200 coins for three players with published pull odds, and coin-based training grows players toward their potential.',
      },
      {
        title: 'The franchise loop',
        body: 'Play a Quick Match, earn coins, open packs or train players, and watch the team rating climb. Then do it again, because the dynasty does not build itself.',
      },
      {
        title: 'Original by design',
        body: 'Every card, crest, stadium, and pack is procedural SVG and CSS; every sound (bat crack, crowd, organ loop) is synthesized from scratch. All names, clubs, and designs are fictional and original.',
      },
      {
        title: 'Installable and offline',
        body: 'A full PWA. Add it to your home screen and, after the first visit, it plays entirely offline. Saves live in your browser; no account, no server, no sign-up.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: 'Diamond Dynasty runs in your browser, free, with nothing to install and no account. It is mobile-first and desktop-ready.',
      },
      {
        title: 'Play a Quick Match',
        body: 'Three innings, one decision per at-bat. Win or lose, you earn coins for the franchise.',
      },
      {
        title: 'Build the dynasty',
        body: 'Spend coins on Scout Packs and training, set your lineup, and raise the team rating. The how-to-play doc covers every screen.',
      },
    ],
    updates: [
      {
        date: '2026-07-20',
        text: 'went live at diamonddynasty.kluthstudios.com and joined the Kluth Studios collection.',
      },
    ],
  },
  {
    name: 'Skyroute',
    inGameTitle: 'SkyRoute Infinite',
    slug: 'skyroute',
    summary:
      'An open-world browser flight simulator. Pick a route, set the weather, and fly.',
    lede:
      'SkyRoute Infinite is an original open-world browser flight simulator. Two aircraft, four regions with paired airports, eight kinds of weather, day through night, and a realism dial from arcade to realistic, straight from your browser. No downloads, no DLC, just wings.',
    category: 'Interactive Experience',
    status: 'Experimental',
    liveUrl: 'https://skyroute.kluthstudios.com',
    launchLabel: 'Fly SkyRoute Infinite',
    docsPath: '/docs/skyroute/overview',
    technologies: ['TypeScript', 'WebGL', 'Web'],
    featured: false,
    accentColor: '#5ab1ff',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Two aircraft',
        body: 'The forgiving SL-9 Skylark piston trainer (cruise 110 kt) and the fast, slippery SwiftJet 100 regional jet (cruise 250 kt).',
      },
      {
        title: 'Four regions, eight airports',
        body: 'Verdant Coast, Amber Mesa, Granite Range, and Azure Atoll. Each region has a paired route and its own flying challenges, from density altitude to short island strips.',
      },
      {
        title: 'Weather and time',
        body: 'Clear to stormy, crosswinds included, at day, sunset, or night. Pick the sky you want to fight.',
      },
      {
        title: 'A real autopilot',
        body: 'Speed, heading, altitude, and vertical-speed targets, a heading bug, NAV route following, and an ILS-style approach mode.',
      },
      {
        title: 'Realism dial',
        body: 'Arcade, Assisted, Realistic, or Custom. Learn gently, then earn your landings.',
      },
      {
        title: 'Logbook',
        body: 'Every flight is logged in your browser. Land gently on the numbers for the high score.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the simulator',
        body: 'SkyRoute Infinite runs in your browser; a keyboard is strongly recommended.',
      },
      {
        title: 'Set up a flight',
        body: 'Pick aircraft, region, route, weather, time, and realism. Then press Start Flight.',
      },
      {
        title: 'Take off',
        body: 'Brakes off, full throttle, rotate at about 65 knots. The how-to-play doc walks the whole first flight.',
      },
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Spindrift',
    inGameTitle: 'SPINDRIFT',
    slug: 'spindrift',
    summary:
      'A vector-style arcade space shooter. Glowing outlines, drifting rocks, one ship.',
    lede:
      'SPINDRIFT is a vector-style arcade space shooter: white outlines on black, momentum that never stops, rocks that split when you shoot them, and saucers that shoot back. A loving homage to the vector arcade era, built new for the browser.',
    category: 'Interactive Experience',
    status: 'Experimental',
    liveUrl: 'https://spindrift.kluthstudios.com',
    launchLabel: 'Play SPINDRIFT',
    docsPath: '/docs/spindrift/overview',
    technologies: ['TypeScript', 'HTML5 Canvas', 'Web'],
    featured: false,
    accentColor: '#e8f1f8',
    studio: 'Kluth Studios',
    highlights: [
      {
        title: 'Vector aesthetic',
        body: 'Glowing white outlines on pure black, monospace type, and a glow toggle for slower machines.',
      },
      {
        title: 'Momentum is the enemy',
        body: 'Thrust and rotation only, no brakes. The ship drifts until you fly it back under control.',
      },
      {
        title: 'Arcade scoring',
        body: 'Rocks score 20, 50, or 100 by size; saucers 200 or 1,000; bonus ship at 10,000. Your high score persists.',
      },
      {
        title: 'Hyperspace',
        body: 'One panic button that teleports you somewhere else, possibly somewhere worse.',
      },
    ],
    gettingStarted: [
      {
        title: 'Open the game',
        body: 'SPINDRIFT runs in your browser, desktop or touch.',
      },
      {
        title: 'Press Enter',
        body: 'Rotate with the arrows, thrust with Up, fire with Space.',
      },
      {
        title: 'Survive',
        body: 'Clear the rocks, mind the saucers, and read the tips before you trust hyperspace.',
      },
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
];

export function getProject(slug: string): Project {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }
  return project;
}

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const ALL_UPDATES = PROJECTS.flatMap((p) =>
  p.updates.map((u) => ({...u, project: p})),
).sort((a, b) => (a.date < b.date ? 1 : -1));
