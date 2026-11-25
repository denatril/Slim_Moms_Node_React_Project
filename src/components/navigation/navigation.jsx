import { Link } from 'react-router-dom';
import styles from './navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        <li>
          <Link to="/login" className={styles.link}>
            LOG IN
          </Link>
        </li>

        <li>
          <Link to="/register" className={styles.link}>
            REGISTRATION
          </Link>
        </li>
      </ul>
    </nav>
  );
}
