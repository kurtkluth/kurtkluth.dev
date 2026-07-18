import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Project} from '@site/src/data/projects';
import ProjectArt from '@site/src/components/ProjectArt';
import StatusBadge from '@site/src/components/StatusBadge';
import styles from './styles.module.css';

interface Props {
  project: Project;
  /** Oversized layout: art beside content instead of above it. */
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: Props): React.ReactNode {
  return (
    <article
      className={clsx(styles.card, featured && styles.featured)}
      style={{'--pc-accent': project.accentColor} as React.CSSProperties}>
      <Link
        to={`/projects/${project.slug}`}
        className={styles.art}
        aria-label={`${project.name} project page`}
        tabIndex={-1}>
        <ProjectArt slug={project.slug} />
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className={styles.name}>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.tags}>
          {project.technologies.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link
            className="kk-btn kk-btn--primary kk-btn--sm"
            to={project.liveUrl}
            rel="noopener">
            Open Project
          </Link>
          <Link className="kk-btn kk-btn--ghost kk-btn--sm" to={project.docsPath}>
            View Documentation
          </Link>
        </div>
      </div>
    </article>
  );
}
