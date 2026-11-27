import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { api, apiError } from '../../redux/api';
import { Logo } from '../logo/logo';
import { Navigation } from '../navigation/navigation';
import { UserInfo } from '../user-info/user-info';
import styles from './header.module.css';

export function Header() {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const [logout, { error, isLoading }] = api.useLogoutMutation();
  const { key } = useLocation();
  const [menuKey, setMenuKey] = useState(null);
  const open = isLoggedIn && menuKey === key;
  return (
    <header className={styles.header} data-private={isLoggedIn}>
      <div className={styles.container}>
        <Logo to={isLoggedIn ? '/diary' : '/'} />
        <div className={isLoggedIn ? (open ? styles.menuOpen : styles.privateMenu) : undefined}>
          <Navigation privateLinks={isLoggedIn} onNavigate={() => setMenuKey(null)} />
        </div>
        {isLoggedIn && <>
          <div className={open ? styles.accountOpen : styles.account}><UserInfo userName={user.name || user.email} onLogout={() => logout()} disabled={isLoading} /></div>
          <button type="button" className={styles.toggle} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setMenuKey(open ? null : key)}>{open ? '×' : '☰'}</button>
        </>}
      </div>
      {error && isLoggedIn && <p role="alert">{apiError(error)}</p>}
    </header>
  );
}
