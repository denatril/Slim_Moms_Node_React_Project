import { LoginForm } from '../components/login-form/login-form'
import styles from './login-page/login-page.module.css'

export default function RegistrationPage() {
  return <main className={styles.page}>
    <div className={styles.container}><LoginForm registration /></div>
  </main>
}
