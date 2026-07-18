import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProjectCard from '@site/src/components/ProjectCard';
import SectionHeader from '@site/src/components/SectionHeader';
import {latestUpdates, projects} from '@site/src/data/projects';
import styles from './index.module.css';

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className="kk-eyebrow">kurtkluth.dev</span>
        <Heading as="h1" className={styles.heroTitle}>
          Software, games, and experiments
          <br />
          built by <span className={styles.heroAccent}>Kurt Kluth</span>.
        </Heading>
        <p className={styles.heroSubtitle}>
          Developer tools, browser games, and web experiments — with the
          documentation to launch, understand, and use every one of them.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/projects">
            Explore Projects
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturedProjects(): ReactNode {
  const featured = projects.filter((p) => p.featured);
  const spotlight = featured.find((p) => p.spotlight);
  const rest = featured.filter((p) => !p.spotlight);
  return (
    <section className={styles.section} aria-label="Featured projects">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Featured work"
          subtitle="Every project ships with a live site and its own documentation."
        />
        {spotlight && (
          <div className={styles.spotlightWrap}>
            <ProjectCard project={spotlight} spotlight />
          </div>
        )}
        <div className={styles.cardGrid}>
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

const buildAreas = [
  {
    title: 'Developer Tools',
    text: 'Practical tooling and deep documentation for working engineers — starting with SQL Server CLR integration.',
    link: '/projects/sqlclr',
    linkText: 'See SQLCLR',
  },
  {
    title: 'Games',
    text: 'Browser games from Kluth Studios: quick to load, easy to learn, and built to chase high scores.',
    link: '/projects/lisa-climber',
    linkText: 'Play the games',
  },
  {
    title: 'Web Experiments',
    text: 'Interactive experiences that explore what the browser can do — evolving in public.',
    link: '/projects/skyroute',
    linkText: 'Try an experiment',
  },
];

function WhatIBuild(): ReactNode {
  return (
    <section
      className={`${styles.section} ${styles.altSection}`}
      aria-label="What I build">
      <div className="container">
        <SectionHeader eyebrow="Focus" title="What I build" />
        <div className={styles.areaGrid}>
          {buildAreas.map((area) => (
            <div key={area.title} className={`kk-card ${styles.areaCard}`}>
              <Heading as="h3" className={styles.areaTitle}>
                {area.title}
              </Heading>
              <p className={styles.areaText}>{area.text}</p>
              <Link to={area.link} className={styles.areaLink}>
                {area.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Updates(): ReactNode {
  const updates = latestUpdates(5);
  return (
    <section className={styles.section} aria-label="Latest updates">
      <div className="container">
        <div className={styles.updatesGrid}>
          <div>
            <SectionHeader
              eyebrow="Changelog"
              title="Latest updates"
              subtitle="Recent changes across projects and documentation."
            />
            <ul className={styles.updateList}>
              {updates.map((update) => (
                <li key={`${update.project.slug}-${update.date}`}>
                  <time className={styles.updateDate} dateTime={update.date}>
                    {update.date}
                  </time>
                  <span>
                    <Link to={`/projects/${update.project.slug}`}>
                      {update.project.name}
                    </Link>{' '}
                    — {update.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`kk-card ${styles.introCard}`}>
            <span className="kk-eyebrow">About</span>
            <Heading as="h3" className={styles.areaTitle}>
              Hi, I’m Kurt.
            </Heading>
            <p className={styles.areaText}>
              I build software for the fun of it — developer tooling by day,
              browser games and experiments under the Kluth Studios banner. This
              site is the home for all of it: launch any project, then read how
              it works.
            </p>
            <div className={styles.introActions}>
              <Link className="button button--outline button--secondary button--sm" to="/about">
                More about me
              </Link>
              <Link
                className="button button--outline button--secondary button--sm"
                href="https://github.com/kurtkluth">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Portfolio & Documentation"
      description="Portfolio and documentation hub for software, games, and experiments built by Kurt Kluth and Kluth Studios.">
      <Hero />
      <main>
        <FeaturedProjects />
        <WhatIBuild />
        <Updates />
      </main>
    </Layout>
  );
}
