import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * One sidebar for the whole documentation hub: a landing page, a getting-started
 * page, one collapsible group per project, and the cross-project guides.
 * Adding a project means adding one category block here; nothing else moves.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'index',
    'getting-started',
    {
      type: 'category',
      label: 'SQLCLR',
      link: {type: 'doc', id: 'sqlclr/overview'},
      items: [
        'sqlclr/overview',
        'sqlclr/quick-start',
        'sqlclr/installation',
        'sqlclr/configuration',
        'sqlclr/core-concepts',
        'sqlclr/examples',
        'sqlclr/security',
        'sqlclr/deployment',
        'sqlclr/troubleshooting',
        'sqlclr/faq',
        'sqlclr/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Lisa Climber',
      link: {type: 'doc', id: 'lisa-climber/overview'},
      items: [
        'lisa-climber/overview',
        'lisa-climber/how-to-play',
        'lisa-climber/gameplay',
        'lisa-climber/tips',
        'lisa-climber/faq',
        'lisa-climber/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Lisetris',
      link: {type: 'doc', id: 'lisetris/overview'},
      items: [
        'lisetris/overview',
        'lisetris/how-to-play',
        'lisetris/gameplay',
        'lisetris/tips',
        'lisetris/faq',
        'lisetris/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Skyroute',
      link: {type: 'doc', id: 'skyroute/overview'},
      items: [
        'skyroute/overview',
        'skyroute/how-to-play',
        'skyroute/aircraft-and-regions',
        'skyroute/controls',
        'skyroute/autopilot',
        'skyroute/tips',
        'skyroute/faq',
        'skyroute/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Spindrift',
      link: {type: 'doc', id: 'spindrift/overview'},
      items: [
        'spindrift/overview',
        'spindrift/how-to-play',
        'spindrift/gameplay',
        'spindrift/tips',
        'spindrift/faq',
        'spindrift/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      link: {type: 'doc', id: 'guides/index'},
      items: [
        'guides/how-to-play',
        'guides/installation-setup',
        'guides/developer-guide',
        'guides/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
