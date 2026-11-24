
import styles from './loader.module.css';

export function Loader({ isLoading = false }) {
  if (!isLoading) return null;

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
    >
      <span className={styles.visuallyHidden}>
        Loading...
      </span>

      <div
        className={styles.spinner}
        aria-hidden="true"
      />
    </div>
  );
}
