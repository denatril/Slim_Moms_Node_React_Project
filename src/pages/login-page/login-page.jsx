import { LoginForm } from "../../components/login-form/login-form";
import styles from "./login-page.module.css";

const LoginPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
