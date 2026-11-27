import { Link } from 'react-router-dom';

import logoImage from '../../images/logo.svg';
import mobileLogoImage from '../../images/logo-mobile.svg';
import styles from './logo.module.css';

export function Logo({ onClick }) {
  return (
    <Link
      to="/diary"
      className={styles.logo}
      aria-label="SlimMom"
      onClick={onClick}
    >
      {/* Mobile logo */}
      <img
        src={mobileLogoImage}
        alt="SlimMom"
        className={styles.mobileImage}
      />

      {/* Tablet and desktop logo */}
      <img
        src={logoImage}
        alt="SlimMom"
        className={styles.desktopImage}
      />
    </Link>
  );
}
