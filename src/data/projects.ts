/**
 * Single source of truth for every project shown on kurtkluth.dev.
 *
 * Project cards, project detail pages, homepage sections, and navigation
 * all read from this registry. Adding a new project is a content task:
 * add an entry here, drop artwork in static/img/projects/, and create a
 * docs folder — no component changes required.
 */

export type ProjectStatus = 'Active' | 'Experimental' | 'Archived';

export type ProjectCategory =
  | 'Developer Tool'
  | 'Game'
  | 'Interactive Experience';

export interface ProjectUpdate {
  date: string; // ISO date, e.g. '2026-07-01'
  text: string;
}

export interface Project {
  /** Display name. */
  name: string;
  /** URL-safe identifier; drives /projects/<slug> and docs paths. */
  slug: string;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Longer description for the project detail page. */
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  liveUrl: string;
  repositoryUrl?: string;
  /** Route of the project's documentation entry point. */
  documentationPath: string;
  technologies: string[];
  /** Featured projects appear in the homepage grid. */
  featured: boolean;
  /** The single oversized card on the homepage. */
  spotlight?: boolean;
  /** Paths under /img/projects/ (artwork first, then screenshots). */
  screenshots: string[];
  /** Per-project accent color (used on cards and detail pages). */
  accentColor: string;
  features: string[];
  /** Short "get started" steps rendered on the detail page. */
  gettingStarted: string[];
  updates: ProjectUpdate[];
}

export const projects: Project[] = [
  {
    name: 'SQLCLR',
    slug: 'sqlclr',
    summary:
      'Tooling and guidance for running .NET code inside SQL Server with the CLR integration.',
    description:
      'SQLCLR is a developer resource focused on SQL Server CLR integration — ' +
      'writing, deploying, and operating .NET assemblies that run inside the ' +
      'database engine. It covers the full lifecycle: building CLR functions, ' +
      'stored procedures, aggregates, and types; deploying them safely; and ' +
      'understanding the security and performance trade-offs involved.',
    category: 'Developer Tool',
    status: 'Active',
    liveUrl: 'https://sqlclr.com',
    documentationPath: '/docs/sqlclr/overview',
    technologies: ['SQL Server', '.NET', 'C#', 'T-SQL'],
    featured: true,
    spotlight: true,
    screenshots: ['sqlclr.svg'],
    accentColor: '#22d3ee',
    features: [
      'CLR functions, stored procedures, aggregates, and user-defined types',
      'Deployment workflows for development and production environments',
      'Security guidance: permission sets, signing, and TRUSTWORTHY alternatives',
      'Performance notes on when CLR beats T-SQL — and when it does not',
      'Copy-ready examples for common CLR integration tasks',
    ],
    gettingStarted: [
      'Open sqlclr.com and skim the overview to see what CLR integration offers.',
      'Follow the Quick Start in the docs to enable CLR and deploy a first function.',
      'Work through the examples to build functions, procedures, and aggregates.',
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'SQLCLR documentation hub launched on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Lisa Climber',
    slug: 'lisa-climber',
    summary:
      'A browser climbing game — guide Lisa up an ever-taller wall without falling.',
    description:
      'Lisa Climber is a browser game from Kluth Studios. Climb as high as you ' +
      'can, plan each move, and don’t look down. It runs directly in the ' +
      'browser with no installation required.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://lisaclimber.kluthstudios.com',
    documentationPath: '/docs/lisa-climber/overview',
    technologies: ['TypeScript', 'HTML5 Canvas', 'Web'],
    featured: true,
    screenshots: ['lisa-climber.svg'],
    accentColor: '#34d399',
    features: [
      'Instant play in the browser — no installation or account',
      'Simple controls that are easy to learn and hard to master',
      'Score chasing: every run is a new attempt at a personal best',
      'Works on desktop and mobile browsers',
    ],
    gettingStarted: [
      'Open lisaclimber.kluthstudios.com in a modern browser.',
      'Read the on-screen controls, then start climbing.',
      'Check the How to Play guide for tips on getting higher.',
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'Lisa Climber joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Lisetris',
    slug: 'lisetris',
    summary:
      'A falling-block puzzle game in the browser — clear lines, chase the high score.',
    description:
      'Lisetris is Kluth Studios’ take on the classic falling-block puzzle. ' +
      'Rotate and place pieces to clear lines as the pace picks up. Playable ' +
      'instantly in the browser.',
    category: 'Game',
    status: 'Active',
    liveUrl: 'https://lisetris.kluthstudios.com',
    documentationPath: '/docs/lisetris/overview',
    technologies: ['TypeScript', 'HTML5 Canvas', 'Web'],
    featured: true,
    screenshots: ['lisetris.svg'],
    accentColor: '#a78bfa',
    features: [
      'Classic falling-block puzzle gameplay',
      'Increasing speed and difficulty as you clear lines',
      'Keyboard controls on desktop, touch on mobile',
      'Instant play — no installation or account',
    ],
    gettingStarted: [
      'Open lisetris.kluthstudios.com in a modern browser.',
      'Use the arrow keys (or on-screen controls) to move and rotate pieces.',
      'Clear lines to score; the game speeds up as you go.',
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'Lisetris joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Skyroute',
    slug: 'skyroute',
    summary:
      'An interactive flying experience — plot your route and take to the sky.',
    category: 'Interactive Experience',
    status: 'Experimental',
    description:
      'Skyroute is an interactive experience from Kluth Studios built around ' +
      'flight and navigation. It runs in the browser and is under active ' +
      'experimentation, so expect it to evolve.',
    liveUrl: 'https://skyroute.kluthstudios.com',
    documentationPath: '/docs/skyroute/overview',
    technologies: ['TypeScript', 'Web'],
    featured: true,
    screenshots: ['skyroute.svg'],
    accentColor: '#60a5fa',
    features: [
      'Flight-and-navigation themed interactive experience',
      'Runs entirely in the browser',
      'Evolving design — new ideas land frequently',
    ],
    gettingStarted: [
      'Open skyroute.kluthstudios.com in a modern browser.',
      'Explore — the experience is designed to be discovered.',
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'Skyroute joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
  {
    name: 'Spindrift',
    slug: 'spindrift',
    summary:
      'An atmospheric interactive experience from Kluth Studios, played in the browser.',
    category: 'Interactive Experience',
    status: 'Experimental',
    description:
      'Spindrift is an atmospheric interactive experience from Kluth Studios. ' +
      'Like the rest of the collection it runs directly in the browser, and ' +
      'it is still evolving.',
    liveUrl: 'https://spindrift.kluthstudios.com',
    documentationPath: '/docs/spindrift/overview',
    technologies: ['TypeScript', 'Web'],
    featured: true,
    screenshots: ['spindrift.svg'],
    accentColor: '#f59e0b',
    features: [
      'Atmospheric, exploratory gameplay',
      'Runs entirely in the browser',
      'Part of the experimental side of Kluth Studios',
    ],
    gettingStarted: [
      'Open spindrift.kluthstudios.com in a modern browser.',
      'Explore — the experience is designed to be discovered.',
    ],
    updates: [
      {
        date: '2026-07-18',
        text: 'Spindrift joined the Kluth Studios collection on kurtkluth.dev.',
      },
    ],
  },
];

export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }
  return project;
}

export function relatedProjects(project: Project, limit = 3): Project[] {
  const others = projects.filter((p) => p.slug !== project.slug);
  const sameCategory = others.filter((p) => p.category === project.category);
  const rest = others.filter((p) => p.category !== project.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Newest updates across all projects, for the homepage. */
export function latestUpdates(
  limit = 5,
): Array<ProjectUpdate & {project: Project}> {
  return projects
    .flatMap((p) => p.updates.map((u) => ({...u, project: p})))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
