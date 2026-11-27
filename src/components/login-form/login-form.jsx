import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIn, register } from "../../redux/auth/auth-operations";
import styles from "./login-form.module.css";

export const LoginForm = ({ registration = false }) => {
  const apiError = useSelector(state => state.auth.error)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (registration && !name.trim()) newErrors.name = "Name is required";
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
    const credentials = { email: email.trim(), password };
    dispatch(registration ? register({ ...credentials, name: name.trim() }) : logIn(credentials));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{registration ? 'Register' : 'Log in'}</h1>

      {apiError && <p role="alert">{apiError}</p>}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {registration && <div className={styles.fieldGroup}>
          <input className={styles.input} name="name" aria-label="Name" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} required />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <input
              type="email"
              aria-label="Email"
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
              aria-label="Password"
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
            {registration ? "Register" : "Log in"}
          </button>
          <Link to={registration ? "/login" : "/register"} className={styles.registerBtn}>
            {registration ? "Log in" : "Register"}
          </Link>
        </div>
      </form>
    </div>
  );
};
