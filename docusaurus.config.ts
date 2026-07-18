import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kurt Kluth',
  tagline: 'Software, games, and experiments built by Kurt Kluth.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://kurtkluth.dev',
  baseUrl: '/',

  organizationName: 'kurtkluth',
  projectName: 'kurtkluth.dev',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: 'docs',
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: false,
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
          showLastUpdateTime: false,
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

  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', content: '#07090d'},
    },
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'Portfolio and documentation hub for software, games, and experiments built by Kurt Kluth and Kluth Studios.',
      },
      {
        name: 'keywords',
        content:
          'Kurt Kluth, Kluth Studios, SQLCLR, SQL Server CLR, browser games, Lisa Climber, Lisetris, Skyroute, Spindrift',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'kurtkluth.dev',
      logo: {
        alt: 'Kurt Kluth logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/docs', label: 'Documentation', position: 'left'},
        {to: '/docs/guides/', label: 'Guides', position: 'left'},
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
          items: [
            {label: 'SQLCLR', to: '/projects/sqlclr'},
            {label: 'Lisa Climber', to: '/projects/lisa-climber'},
            {label: 'Lisetris', to: '/projects/lisetris'},
            {label: 'Skyroute', to: '/projects/skyroute'},
            {label: 'Spindrift', to: '/projects/spindrift'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'SQLCLR Docs', to: '/docs/sqlclr/overview'},
            {label: 'Guides', to: '/docs/guides/'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            {label: 'GitHub', href: 'https://github.com/kurtkluth'},
            {label: 'sqlclr.com', href: 'https://sqlclr.com'},
            {label: 'Kluth Studios games', to: '/projects'},
            {label: 'Email', href: 'mailto:kurtkluth@icloud.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kurt Kluth. Built with Docusaurus.`,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['csharp', 'sql', 'powershell', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
