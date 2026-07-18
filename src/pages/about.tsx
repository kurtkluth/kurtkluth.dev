import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {PROJECTS} from '@site/src/data/projects';
import SectionHeading from '@site/src/components/SectionHeading';
import StatusBadge from '@site/src/components/StatusBadge';
import styles from './about.module.css';

export default function About(): React.ReactNode {
  const games = PROJECTS.filter((p) => p.studio === 'Kluth Studios');

  return (
    <Layout
      title="About"
      description="About Kurt Kluth and Kluth Studios. Who builds this, and why.">
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.inner}>
            <span className="kk-overline">About</span>
            <h1 className={styles.title}>Hi, I&rsquo;m Kurt.</h1>
            <p className={styles.pull}>
              I build software for the fun of building it.
            </p>
            <p className={styles.lede}>
              By day I&rsquo;m a SQL Server architect with thirty years at the
              engine boundary. The last stretch of it is documented at{' '}
              <Link to="https://sqlclr.com" rel="noopener">
                sqlclr.com
              </Link>
              . But what I care about most now is the next generation. Under
              the <strong>Kluth Studios</strong> banner, I work with some of the
              brightest young minds I&rsquo;ve met, and the things they&rsquo;re
              building are genuinely earth-moving. The games you&rsquo;ll find
              here are my own: chunky little experiments I make on the side,
              hosted under the same banner. Launch any project, then read how it
              works.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              overline="Kluth Studios"
              title="The games"
              lede="Browser games and interactive experiences. Playable instantly, free, no installs, no accounts. Several of them are made for Lisa, and named accordingly."
            />
            <ul className={styles.projectList}>
              {games.map((p) => (
                <li key={p.slug}>
                  <div className={styles.projectRow}>
                    <Link to={`/projects/${p.slug}`} className={styles.projectName}>
                      {p.name}
                    </Link>
                    <StatusBadge status={p.status} />
                  </div>
                  <p>{p.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionRaised}`}>
          <div className={styles.inner}>
            <SectionHeading
              overline="The serious work"
              title="SQLCLR"
              lede="A developer resource for SQL Server CLR integration, running governed, verifiable .NET code inside the database engine. It sets the design language for this whole site, and it gets the deepest documentation here."
            />
            <div className={styles.ctaRow}>
              <Link className="kk-btn kk-btn--primary" to="/projects/sqlclr">
                The SQLCLR project
              </Link>
              <Link className="kk-btn kk-btn--ghost" to="/docs/sqlclr/overview">
                SQLCLR documentation
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              overline="Contact"
              title="Say hello"
              lede="The code is public and the inbox is open."
            />
            <ul className={styles.contact}>
              <li>
                <span className={styles.contactLabel}>github</span>
                <Link to="https://github.com/kurtkluth" rel="noopener">
                  github.com/kurtkluth
                </Link>
              </li>
              <li>
                <span className={styles.contactLabel}>email</span>
                <Link to="mailto:kurt@kurtkluth.dev">
                  kurt@kurtkluth.dev
                </Link>
              </li>
              <li>
                <span className={styles.contactLabel}>web</span>
                <Link to="https://sqlclr.com" rel="noopener">
                  sqlclr.com
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
