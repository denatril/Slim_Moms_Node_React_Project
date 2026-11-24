
import logoImage from '../../images/logo.svg';
import mobileLogoImage from '../../images/logo-mobile.svg';
import styles from './logo.module.css';

export function Logo({ onClick }) {
  return (
    <a
      href="#top"
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
    </a>
  );
}
