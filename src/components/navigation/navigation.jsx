import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

export function Navigation({ privateLinks, onNavigate }) {
  const links = privateLinks ? [['/diary', 'Diary'], ['/calculator', 'Calculator']] : [['/login', 'Log in'], ['/register', 'Registration']];
  return <nav className={styles.nav} aria-label="Main navigation">
    <ul className={styles.list}>
      {links.map(([path, label]) => <li key={path}><NavLink to={path} onClick={onNavigate} className={styles.link}>{label}</NavLink></li>)}
    </ul>
  </nav>;
}
