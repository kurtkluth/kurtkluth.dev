import type {CSSProperties, ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import type {Project} from '@site/src/data/projects';
import ProjectCard from '@site/src/components/ProjectCard';
import StatusBadge from '@site/src/components/StatusBadge';
import TechTag from '@site/src/components/TechTag';
import {relatedProjects} from '@site/src/data/projects';
import styles from './styles.module.css';

/**
 * Route component for /projects/<slug>. The `project` prop is injected by
 * the project-pages-plugin in docusaurus.config.ts from src/data/projects.ts.
 */
export default function ProjectDetailPage({
  project,
}: {
  project: Project;
}): ReactNode {
  const artwork = useBaseUrl(`/img/projects/${project.screenshots[0]}`);
  const related = relatedProjects(project);
  return (
    <Layout title={project.name} description={project.summary}>
      <main
        className={styles.main}
        style={{'--project-accent': project.accentColor} as CSSProperties}>
        <header className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.heroText}>
                <div className={styles.heroMeta}>
                  <span className={styles.category}>{project.category}</span>
                  <StatusBadge status={project.status} />
                </div>
                <Heading as="h1" className={styles.heroTitle}>
                  {project.name}
                </Heading>
                <p className={styles.heroSummary}>{project.description}</p>
                <div className={styles.heroActions}>
                  <Link
                    className="button button--primary button--lg"
                    href={project.liveUrl}>
                    Open {project.name}
                  </Link>
                  <Link
                    className="button button--outline button--secondary button--lg"
                    to={project.documentationPath}>
                    View Documentation
                  </Link>
                </div>
                <p className={styles.liveUrl}>
                  <span className="kk-eyebrow">Live at</span>{' '}
                  <Link href={project.liveUrl}>
                    {project.liveUrl.replace('https://', '')}
                  </Link>
                </p>
              </div>
              <div className={styles.heroArt}>
                <img src={artwork} alt={`${project.name} artwork`} />
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className={styles.grid}>
            <section className={styles.section} aria-labelledby="features">
              <span className="kk-eyebrow">Key Features</span>
              <Heading as="h2" id="features" className={styles.sectionTitle}>
                What {project.name} does
              </Heading>
              <ul className={styles.featureList}>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section} aria-labelledby="start">
              <span className="kk-eyebrow">Getting Started</span>
              <Heading as="h2" id="start" className={styles.sectionTitle}>
                Up and running
              </Heading>
              <ol className={styles.stepList}>
                {project.gettingStarted.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Link className={styles.docLink} to={project.documentationPath}>
                Read the full documentation →
              </Link>
            </section>

            <section className={styles.section} aria-labelledby="tech">
              <span className="kk-eyebrow">Technology</span>
              <Heading as="h2" id="tech" className={styles.sectionTitle}>
                Built with
              </Heading>
              <div className={styles.tags}>
                {project.technologies.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </div>
              {project.repositoryUrl && (
                <p>
                  <Link href={project.repositoryUrl}>Source repository →</Link>
                </p>
              )}
            </section>

            <section className={styles.section} aria-labelledby="updates">
              <span className="kk-eyebrow">Status</span>
              <Heading as="h2" id="updates" className={styles.sectionTitle}>
                Recent changes
              </Heading>
              <ul className={styles.updateList}>
                {project.updates.map((update) => (
                  <li key={`${update.date}-${update.text}`}>
                    <time className={styles.updateDate} dateTime={update.date}>
                      {update.date}
                    </time>
                    <span>{update.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {related.length > 0 && (
            <section
              className={styles.relatedSection}
              aria-labelledby="related">
              <span className="kk-eyebrow">Related</span>
              <Heading as="h2" id="related" className={styles.sectionTitle}>
                More projects
              </Heading>
              <div className={styles.relatedGrid}>
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
