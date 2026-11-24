import { Logo } from '../logo/logo';
import { Navigation } from '../navigation/navigation';
import { UserInfo } from '../user-info/user-info';
import styles from './header.module.css';

export function Header({
  isLoggedIn = false,
  userName = 'User',
  onLogout,
  onLogoClick,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo onClick={onLogoClick} />
        {isLoggedIn ? (
          <UserInfo userName={userName} onLogout={onLogout} />
        ) : (
          <Navigation />
        )}
      </div>
    </header>
  );
}