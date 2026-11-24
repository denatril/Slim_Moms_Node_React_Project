
import styles from './navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        <li>
          <a
            href="#login"
            className={`${styles.link} ${styles.active}`}
            aria-current="page"
          >
            LOG IN
          </a>
        </li>

        <li>
          <a href="#registration" className={styles.link}>
            REGISTRATION
          </a>
        </li>
      </ul>
    </nav>
  );
}
