import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../../redux/auth/auth-operations";
import styles from "./login-form.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(logIn({ email, password }));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>LOG IN</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.loginBtn}>
            Log in
          </button>
          <Link to="/register" className={styles.registerBtn}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};
