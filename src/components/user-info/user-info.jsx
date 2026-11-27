
import styles from './user-info.module.css';

export function UserInfo({ userName = 'User', onLogout, disabled }) {
  return (
    <div className={styles.userInfo}>
      <span className={styles.name}>{userName}</span>

      <span className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        className={styles.logoutBtn}
        onClick={onLogout}
        disabled={disabled}
        aria-label={`Log out ${userName}`}
      >
        Exit
      </button>
    </div>
  );
}
