import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: Props): ReactNode {
  return (
    <div className={styles.header}>
      <span className="kk-eyebrow">{eyebrow}</span>
      <Heading as="h2" className={styles.title}>
        {title}
      </Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
