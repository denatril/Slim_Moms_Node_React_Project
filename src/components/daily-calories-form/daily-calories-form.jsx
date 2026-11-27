import { useState } from 'react';
import { api, apiError } from '../../redux/api';
import styles from './daily-calories-form.module.css';

const INITIAL_VALUES = {
  height: '',
  age: '',
  currentWeight: '',
  desiredWeight: '',
  bloodType: 1,
};

export function DailyCaloriesForm({ onResult }) {
  const [calculate, { isLoading }] = api.useCalculateCaloriesMutation();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setValues((prev) => ({
      ...prev,
      [name]: name === 'bloodType' ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const h = Number(values.height);
    const a = Number(values.age);
    const current = Number(values.currentWeight);
    const desired = Number(values.desiredWeight);

    if (!h || h < 100 || h > 250) {
      return 'Height must be between 100 and 250 cm.';
    }
    if (!Number.isInteger(a) || a < 18 || a > 100) {
      return 'Age must be between 18 and 100 years.';
    }
    if (!current || current < 30 || current > 300) {
      return 'Current weight must be between 30 and 300 kg.';
    }
    if (!desired || desired < 30 || desired > 300) {
      return 'Desired weight must be between 30 and 300 kg.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    try {
      const body = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
      const result = await calculate(body).unwrap();
      onResult(result);
    } catch (reason) {
      setError(apiError(reason));
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>
        Calculate your daily calorie intake right now
      </h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.columns}>
          <div className={styles.column}>
            <label className={styles.field}>
              <input
                type="number"
                name="height"
                value={values.height}
                onChange={handleChange}
                placeholder="Height *"
                className={styles.input}
                required
              />
            </label>

            <label className={styles.field}>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="Age *"
                className={styles.input}
                required
              />
            </label>

            <label className={styles.field}>
              <input
                type="number"
                name="currentWeight"
                value={values.currentWeight}
                onChange={handleChange}
                placeholder="Current weight *"
                className={styles.input}
                required
              />
            </label>
          </div>

          <div className={styles.column}>
            <label className={styles.field}>
              <input
                type="number"
                name="desiredWeight"
                value={values.desiredWeight}
                onChange={handleChange}
                placeholder="Desired weight *"
                className={styles.input}
                required
              />
            </label>

            <fieldset className={styles.radioGroup}>
              <legend className={styles.legend}>Blood type *</legend>
              <div className={styles.radioOptions}>
                {[1, 2, 3, 4].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={values.bloodType === type}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioText}>{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {error && (
          <p role="alert" style={{ color: '#fc842d', fontSize: '13px', fontWeight: 700, margin: '8px 0 0' }}>
            {error}
          </p>
        )}

        <button disabled={isLoading} type="submit" className={styles.submitBtn}>
          {isLoading ? 'Calculating…' : 'Start losing weight'}
        </button>
      </form>
    </section>
  );
}