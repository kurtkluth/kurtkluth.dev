import type {ReactNode} from 'react';
import styles from './styles.module.css';

export default function TechTag({children}: {children: ReactNode}): ReactNode {
  return <span className={styles.tag}>{children}</span>;
}
