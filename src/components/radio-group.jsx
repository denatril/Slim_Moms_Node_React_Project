import styles from './radio-group.module.css'

export default function RadioGroup({ legend, name, options, value, defaultValue, onChange, required }) {
  return (
    <fieldset className={styles.radioGroup}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.radioOptions}>
        {options.map((option) => (
          <label className={styles.radioLabel} key={option.value}>
            <input
              className={styles.radioInput}
              type="radio"
              name={name}
              value={option.value}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={defaultValue === undefined ? undefined : defaultValue === option.value}
              onChange={onChange}
              required={required}
            />
            <span className={styles.radioCustom} aria-hidden="true" />
            <span className={styles.radioText}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
