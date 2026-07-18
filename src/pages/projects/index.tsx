import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProjectCard from '@site/src/components/ProjectCard';
import {projects, type ProjectCategory} from '@site/src/data/projects';
import styles from './styles.module.css';

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = [
  'All',
  'Developer Tool',
  'Game',
  'Interactive Experience',
];

export default function ProjectsIndex(): ReactNode {
  const [filter, setFilter] = useState<Filter>('All');
  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  return (
    <Layout
      title="Projects"
      description="All projects by Kurt Kluth and Kluth Studios: developer tools, browser games, and interactive experiments.">
      <main className={styles.main}>
        <div className="container">
          <header className={styles.header}>
            <span className="kk-eyebrow">Portfolio</span>
            <Heading as="h1" className={styles.title}>
              All Projects
            </Heading>
            <p className={styles.subtitle}>
              Everything currently live — each with its own site and
              documentation.
            </p>
          </header>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter projects by category">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={clsx(
                  styles.filterButton,
                  filter === f && styles.filterActive,
                )}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className={styles.grid}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
