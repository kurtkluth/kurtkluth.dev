import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './about.module.css';

export default function About(): ReactNode {
  const photo = useBaseUrl('/img/kurt-75.png');
  return (
    <Layout
      title="About"
      description="About Kurt Kluth and Kluth Studios — who builds this stuff and why.">
      <main className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              <span className="kk-eyebrow">About</span>
              <Heading as="h1" className={styles.title}>
                Kurt Kluth
              </Heading>
              <p className={styles.lead}>
                I’m a software developer who builds things for the fun of
                building them — developer tooling, browser games, and web
                experiments. This site is the front door to all of it.
              </p>
              <Heading as="h2" className={styles.subheading}>
                Kluth Studios
              </Heading>
              <p className={styles.body}>
                Kluth Studios is the banner for my games and interactive
                experiments: Lisa Climber, Lisetris, Skyroute, and Spindrift.
                They all run directly in the browser — no installs, no
                accounts, just play.
              </p>
              <Heading as="h2" className={styles.subheading}>
                SQLCLR
              </Heading>
              <p className={styles.body}>
                On the serious side, <Link href="https://sqlclr.com">SQLCLR</Link>{' '}
                is my developer-tool project focused on SQL Server CLR
                integration — running .NET code inside the database engine,
                done right.
              </p>
              <Heading as="h2" className={styles.subheading}>
                Contact
              </Heading>
              <div className={styles.actions}>
                <Link
                  className="button button--primary"
                  href="https://github.com/kurtkluth">
                  GitHub
                </Link>
                <Link className="button button--outline button--secondary" to="/projects">
                  Browse Projects
                </Link>
              </div>
            </div>
            <figure className={styles.photoWrap}>
              <img
                src={photo}
                alt="Kurt Kluth"
                className={styles.photo}
              />
              <figcaption className={styles.caption}>
                Proof that I have always looked this good.
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    </Layout>
  );
}
