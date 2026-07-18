import type {ReactNode} from 'react';
import clsx from 'clsx';
import type {ProjectStatus} from '@site/src/data/projects';
import styles from './styles.module.css';

const statusClass: Record<ProjectStatus, string> = {
  Active: styles.active,
  Experimental: styles.experimental,
  Archived: styles.archived,
};

export default function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}): ReactNode {
  return (
    <span className={clsx(styles.badge, statusClass[status])}>
      <span className={styles.dot} aria-hidden="true" />
      {status}
    </span>
  );
}
