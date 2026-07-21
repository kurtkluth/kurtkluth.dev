import React from 'react';
import Layout from '@theme/Layout';
import {PROJECTS} from '@site/src/data/projects';
import ProjectCard from '@site/src/components/ProjectCard';
import SectionHeading from '@site/src/components/SectionHeading';
import styles from './styles.module.css';

export default function ProjectsIndex(): React.ReactNode {
  const tools = PROJECTS.filter((p) => p.category === 'Developer Tool');
  const studio = PROJECTS.filter((p) => p.category !== 'Developer Tool');

  return (
    <Layout
      title="Projects"
      description="Every project by Kurt Kluth and Kluth Studios, with live sites, documentation, and status in one place.">
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.inner}>
            <SectionHeading
              as="h1"
              overline="Projects"
              title="Everything, in one place"
              lede="Eight projects, each with a live site and its own documentation. Launch anything; read how it works."
            />
          </div>
        </header>

        <section className={styles.section} id="developer-tools">
          <div className={styles.inner}>
            <SectionHeading
              overline="Developer tools"
              title="The serious work"
              lede="Tooling and deep documentation for working engineers."
            />
            <div className={styles.gridWide}>
              {tools.map((p) => (
                <ProjectCard key={p.slug} project={p} featured />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionRaised}`} id="games">
          <div className={styles.inner}>
            <SectionHeading
              overline="Kluth Studios"
              title="Games and experiments"
              lede="Browser games and interactive experiences. Quick to load, easy to learn, free to play. No installs, no accounts."
            />
            <div className={styles.grid}>
              {studio.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
