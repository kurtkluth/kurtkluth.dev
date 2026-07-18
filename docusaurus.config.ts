import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, Plugin} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {projects} from './src/data/projects';

/**
 * Generates one route per project under /projects/<slug> from the metadata
 * registry in src/data/projects.ts. Adding a project there is enough to get
 * a detail page — no page files or component changes needed.
 */
function projectPagesPlugin(): Plugin<void> {
  return {
    name: 'project-pages-plugin',
    async contentLoaded({actions}) {
      const {addRoute, createData} = actions;
      await Promise.all(
        projects.map(async (project) => {
          const dataPath = await createData(
            `project-${project.slug}.json`,
            JSON.stringify(project, null, 2),
          );
          addRoute({
            path: `/projects/${project.slug}`,
            component: '@site/src/components/ProjectDetailPage/index.tsx',
            exact: true,
            modules: {project: dataPath},
          });
        }),
      );
    },
  };
}

// Routes from the pre-rebuild site (stock Docusaurus tutorial scaffold).
// Everything is redirected so no previously indexed URL 404s.
const legacyDocRoutes = [
  '/docs/intro',
  '/docs/hello',
  '/docs/category/tutorial-basics',
  '/docs/category/tutorial-extras',
  '/docs/tutorial-basics/congratulations',
  '/docs/tutorial-basics/create-a-blog-post',
  '/docs/tutorial-basics/create-a-document',
  '/docs/tutorial-basics/create-a-page',
  '/docs/tutorial-basics/deploy-your-site',
  '/docs/tutorial-basics/markdown-features',
  '/docs/tutorial-extras/manage-docs-versions',
  '/docs/tutorial-extras/translate-your-site',
];

const config: Config = {
  title: 'Kurt Kluth',
  tagline: 'Software, games, and experiments built by Kurt Kluth.',
  favicon: 'img/favicon.svg',

  future: {
    // Prepare for Docusaurus 4: opt into all v4 compatibility flags.
    v4: true,
  },

  url: 'https://kurtkluth.dev',
  baseUrl: '/',

  organizationName: 'kurtkluth',
  projectName: 'kurtkluth.dev',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    projectPagesPlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {to: '/docs', from: legacyDocRoutes},
          {
            to: '/docs',
            from: legacyDocRoutes.map((r) =>
              r.replace('/docs/', '/docs/next/'),
            ),
          },
          {
            to: '/',
            from: [
              '/blog',
              '/markdown-page',
              '/my-markdown-page',
              '/my-react-page',
            ],
          },
        ],
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/kurtkluth/kurtkluth.dev/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Portfolio and documentation hub for software, games, and experiments built by Kurt Kluth and Kluth Studios.',
      },
    ],
    navbar: {
      title: 'kurtkluth.dev',
      logo: {
        alt: 'Kurt Kluth logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/projects', label: 'Projects', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guides',
          position: 'left',
          label: 'Guides',
        },
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/kurtkluth',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: projects.map((p) => ({
            label: p.name,
            to: `/projects/${p.slug}`,
          })),
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'All Documentation', to: '/docs'},
            {label: 'Guides', to: '/docs/guides'},
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            {label: 'GitHub', href: 'https://github.com/kurtkluth'},
            {label: 'SQLCLR', href: 'https://sqlclr.com'},
            {label: 'Kluth Studios games', to: '/projects'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kurt Kluth. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['csharp', 'sql', 'powershell', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
