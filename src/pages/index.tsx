import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  ALL_UPDATES,
  FEATURED_PROJECTS,
  PROJECTS,
} from '@site/src/data/projects';
import ProjectCard from '@site/src/components/ProjectCard';
import ProjectArt from '@site/src/components/ProjectArt';
import SectionHeading from '@site/src/components/SectionHeading';
import StatusBadge from '@site/src/components/StatusBadge';
import styles from './index.module.css';

function HeroTerminal() {
  const rows = PROJECTS.map((p) => ({
    slug: p.slug,
    kind:
      p.category === 'Developer Tool'
        ? 'developer-tool'
        : p.category === 'Game'
          ? 'game'
          : 'experience',
    status: p.status.toLowerCase(),
  }));
  return (
    <div className={styles.terminal} aria-hidden="true">
      <div className={styles.terminalBar}>
        <span />
        <span />
        <span />
        <em>kurt@kluthstudios: ~</em>
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$</span> kurt list --projects
        </div>
        {rows.map((r) => (
          <div key={r.slug} className={styles.terminalRow}>
            <span className={styles.tSlug}>{r.slug}</span>
            <span className={styles.tKind}>{r.kind}</span>
            <span
              className={
                r.status === 'active' ? styles.tActive : styles.tExperimental
              }>
              {r.status}
            </span>
          </div>
        ))}
        <div className={styles.terminalComment}>
          # seven projects · one home · docs included
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className="kk-overline">kurtkluth.dev</span>
          <h1 className={styles.heroTitle}>
            Software, games, and{' '}
            <em className={styles.heroEm}>experiments</em> built by Kurt
            Kluth.
          </h1>
          <p className={styles.heroLede}>
            Developer tools, browser games, and web experiments, with the
            documentation to launch, understand, and use every one of them.
          </p>
          <div className={styles.heroActions}>
            <Link className="kk-btn kk-btn--primary" to="/projects">
              Explore Projects
            </Link>
            <Link className="kk-btn kk-btn--ghost" to="/docs">
              Read the Docs
            </Link>
          </div>
          <p className={styles.heroMeta}>
            <Link to="https://github.com/kurtkluth" rel="noopener">
              github.com/kurtkluth
            </Link>
            {' · '}
            <Link to="https://sqlclr.com" rel="noopener">
              sqlclr.com
            </Link>
          </p>
        </div>
        <HeroTerminal />
      </div>
    </header>
  );
}

function Featured() {
  const [first, ...rest] = FEATURED_PROJECTS;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          overline="Projects"
          title="Featured work"
          lede="Every project ships with a live site and its own documentation."
        />
        <div className={styles.featuredGrid}>
          <ProjectCard project={first} featured />
          <div className={styles.featuredPair}>
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
        <div className={styles.sectionFoot}>
          <Link className="kk-btn kk-btn--ghost" to="/projects">
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}

const FOCUS = [
  {
    title: 'Developer Tools',
    body: 'Practical tooling and deep documentation for working engineers, starting with SQL Server CLR integration.',
    to: '/projects/sqlclr',
    cta: 'See SQLCLR',
  },
  {
    title: 'Games',
    body: 'Browser games from Kluth Studios: quick to load, easy to learn, and built to chase high scores.',
    to: '/projects',
    cta: 'Play the games',
  },
  {
    title: 'Web Experiments',
    body: 'Interactive experiences that explore what the browser can do, evolving in public.',
    to: '/projects/skyroute',
    cta: 'Try an experiment',
  },
];

function Focus() {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`}>
      <div className={styles.inner}>
        <SectionHeading overline="Focus" title="What I build" />
        <div className={styles.focusGrid}>
          {FOCUS.map((f) => (
            <Link key={f.title} to={f.to} className={styles.focusCard}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <span className={styles.focusCta}>{f.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Studio() {
  const games = PROJECTS.filter((p) => p.studio === 'Kluth Studios');
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          overline="Kluth Studios"
          title="The game collection"
          lede="Free in your browser. No installs, no accounts."
        />
        <div className={styles.studioGrid}>
          {games.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className={styles.studioCard}>
              <ProjectArt slug={p.slug} />
              <div className={styles.studioBody}>
                <strong>{p.name}</strong>
                <StatusBadge status={p.status} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Updates() {
  return (
    <section className={`${styles.section} ${styles.sectionRaised}`}>
      <div className={styles.inner}>
        <SectionHeading
          overline="Changelog"
          title="Latest updates"
          lede="Recent changes across projects and documentation."
        />
        <ul className={styles.updates}>
          {ALL_UPDATES.slice(0, 6).map((u) => (
            <li key={u.project.slug + u.date}>
              <span className={styles.updateDate}>{u.date}</span>
              <span className={styles.updateText}>
                <Link to={`/projects/${u.project.slug}`}>
                  {u.project.name}
                </Link>{' '}
                {u.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} ${styles.about}`}>
        <div>
          <span className="kk-overline">About</span>
          <h2 className={styles.aboutTitle}>Hi, I&rsquo;m Kurt.</h2>
          <p className={styles.aboutBody}>
            I build software for the fun of it. Developer tooling by day,
            browser games and experiments under the Kluth Studios banner the
            rest of the time. This site is the home for all of it. Launch any
            project, then read how it works.
          </p>
          <div className={styles.heroActions}>
            <Link className="kk-btn kk-btn--ghost" to="/about">
              More about me
            </Link>
            <Link
              className="kk-btn kk-btn--ghost"
              to="https://github.com/kurtkluth"
              rel="noopener">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="Portfolio & Documentation"
      description="Portfolio and documentation hub for software, games, and experiments built by Kurt Kluth and Kluth Studios.">
      <main className={styles.main}>
        <Hero />
        <Featured />
        <Focus />
        <Studio />
        <Updates />
        <About />
      </main>
    </Layout>
  );
}
