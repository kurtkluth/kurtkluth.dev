import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const gameDocs = (slug: string) => [
  `${slug}/how-to-play`,
  `${slug}/features-and-controls`,
  `${slug}/faq`,
  `${slug}/troubleshooting`,
  `${slug}/changelog`,
];

const sidebars: SidebarsConfig = {
  docs: [
    'index',
    'getting-started',
    {
      type: 'category',
      label: 'SQLCLR',
      link: {type: 'doc', id: 'sqlclr/overview'},
      items: [
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
      items: gameDocs('lisa-climber'),
    },
    {
      type: 'category',
      label: 'Lisetris',
      link: {type: 'doc', id: 'lisetris/overview'},
      items: gameDocs('lisetris'),
    },
    {
      type: 'category',
      label: 'Skyroute',
      link: {type: 'doc', id: 'skyroute/overview'},
      items: gameDocs('skyroute'),
    },
    {
      type: 'category',
      label: 'Spindrift',
      link: {type: 'doc', id: 'spindrift/overview'},
      items: gameDocs('spindrift'),
    },
  ],
  guides: [
    'guides/index',
    'guides/how-to-play',
    'guides/installation-and-setup',
    'guides/developer-guide',
    'guides/troubleshooting',
  ],
};

export default sidebars;
