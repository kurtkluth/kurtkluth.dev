import React from 'react';
import clsx from 'clsx';
import type {ProjectStatus} from '@site/src/data/projects';
import styles from './styles.module.css';

export default function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}): React.ReactNode {
  return (
    <span
      className={clsx(styles.badge, styles[`badge${status}`])}
      title={`Project status: ${status}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status}
    </span>
  );
}
