import { RegistrationForm } from "../../components/registration-form/registration-form";
import styles from "../login-page/login-page.module.css";

const RegistrationPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
