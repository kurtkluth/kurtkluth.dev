import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Props {
  overline: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}

export default function SectionHeading({
  overline,
  title,
  lede,
  align = 'left',
  as: Heading = 'h2',
}: Props): React.ReactNode {
  return (
    <header
      className={clsx(styles.root, align === 'center' && styles.center)}>
      <span className="kk-overline">{overline}</span>
      <Heading className={styles.title}>{title}</Heading>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </header>
  );
}
