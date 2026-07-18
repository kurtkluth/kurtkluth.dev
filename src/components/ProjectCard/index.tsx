import type {CSSProperties, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import type {Project} from '@site/src/data/projects';
import StatusBadge from '@site/src/components/StatusBadge';
import TechTag from '@site/src/components/TechTag';
import styles from './styles.module.css';

interface Props {
  project: Project;
  /** Oversized layout for the homepage spotlight card. */
  spotlight?: boolean;
}

export default function ProjectCard({
  project,
  spotlight = false,
}: Props): ReactNode {
  const artwork = useBaseUrl(`/img/projects/${project.screenshots[0]}`);
  return (
    <article
      className={clsx('kk-card', styles.card, spotlight && styles.spotlight)}
      style={{'--project-accent': project.accentColor} as CSSProperties}>
      <Link
        to={`/projects/${project.slug}`}
        className={styles.artworkLink}
        aria-label={`${project.name} project page`}>
        <img
          src={artwork}
          alt={`${project.name} artwork`}
          className={styles.artwork}
          loading="lazy"
        />
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <Heading as="h3" className={styles.title}>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </Heading>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.tags}>
          {project.technologies.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>
        <div className={styles.actions}>
          <Link
            className="button button--primary button--sm"
            href={project.liveUrl}>
            Open Project
          </Link>
          <Link
            className="button button--outline button--secondary button--sm"
            to={project.documentationPath}>
            View Documentation
          </Link>
        </div>
      </div>
    </article>
  );
}
