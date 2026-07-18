import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {getProject, PROJECTS} from '@site/src/data/projects';
import ProjectArt from '@site/src/components/ProjectArt';
import ProjectCard from '@site/src/components/ProjectCard';
import StatusBadge from '@site/src/components/StatusBadge';
import SectionHeading from '@site/src/components/SectionHeading';
import styles from './styles.module.css';

export default function ProjectPage({slug}: {slug: string}): React.ReactNode {
  const project = getProject(slug);
  const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Layout
      title={project.name}
      description={project.summary}>
      <main
        className={styles.main}
        style={{'--pp-accent': project.accentColor} as React.CSSProperties}>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <nav className={styles.crumbs} aria-label="Breadcrumb">
                <Link to="/projects">Projects</Link>
                <span aria-hidden="true">/</span>
                <span>{project.name}</span>
              </nav>
              <div className={styles.heroMeta}>
                <span className={styles.category}>
                  {project.category} · {project.studio}
                </span>
                <StatusBadge status={project.status} />
              </div>
              <h1 className={styles.title}>{project.name}</h1>
              {project.inGameTitle && project.inGameTitle !== project.name ? (
                <p className={styles.presents}>
                  presents in-game as{' '}
                  <strong>{project.inGameTitle}</strong>
                </p>
              ) : null}
              <p className={styles.lede}>{project.lede}</p>
              <div className={styles.actions}>
                <Link
                  className="kk-btn kk-btn--primary"
                  to={project.liveUrl}
                  rel="noopener">
                  {project.launchLabel}
                </Link>
                <Link className="kk-btn kk-btn--ghost" to={project.docsPath}>
                  View Documentation
                </Link>
              </div>
              <p className={styles.liveAt}>
                live at{' '}
                <Link to={project.liveUrl} rel="noopener">
                  {project.liveUrl.replace('https://', '')}
                </Link>
                {project.repositoryUrl ? (
                  <>
                    {' · '}
                    <Link to={project.repositoryUrl} rel="noopener">
                      source
                    </Link>
                  </>
                ) : null}
              </p>
            </div>
            <div className={styles.heroArt}>
              <ProjectArt slug={project.slug} />
            </div>
          </div>
        </header>

        {/* Key features */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              overline="Key features"
              title={`What ${project.name} does`}
            />
            <div className={styles.highlights}>
              {project.highlights.map((h) => (
                <div key={h.title} className={styles.highlight}>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting started */}
        <section className={`${styles.section} ${styles.sectionRaised}`}>
          <div className={styles.inner}>
            <SectionHeading
              overline="Getting started"
              title="Up and running in three steps"
            />
            <ol className={styles.steps}>
              {project.gettingStarted.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Technology + status */}
        <section className={styles.section}>
          <div className={`${styles.inner} ${styles.split}`}>
            <div>
              <SectionHeading overline="Technology" title="Built with" />
              <ul className={styles.tags}>
                {project.technologies.map((tech) => (
                  <li key={tech} className={styles.tag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading overline="Status" title="Recent changes" />
              <ul className={styles.updates}>
                {project.updates.map((u) => (
                  <li key={u.date + u.text}>
                    <span className={styles.updateDate}>{u.date}</span>
                    <span>
                      {project.name} {u.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Docs CTA */}
        <section className={styles.ctaBand}>
          <div className={styles.inner}>
            <div className={styles.cta}>
              <div>
                <h2>Read the {project.name} documentation</h2>
                <p>
                  Setup, usage, and troubleshooting. Everything on this page,
                  explained properly.
                </p>
              </div>
              <div className={styles.actions}>
                <Link className="kk-btn kk-btn--primary" to={project.docsPath}>
                  Open the docs
                </Link>
                <Link
                  className="kk-btn kk-btn--ghost"
                  to={project.liveUrl}
                  rel="noopener">
                  {project.launchLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading overline="More projects" title="Keep exploring" />
            <div className={styles.related}>
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
