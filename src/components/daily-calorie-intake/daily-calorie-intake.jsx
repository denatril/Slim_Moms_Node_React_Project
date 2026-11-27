import styles from './daily-calorie-intake.module.css';

export function DailyCalorieIntake({
  calories,
  forbiddenFoods,
  onStartLosingWeight,
}) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Your recommended daily calorie intake is
      </h2>

      <p className={styles.caloriesValue}>
        {calories} <span className={styles.caloriesUnit}>kcal</span>
      </p>

      <div className={styles.foodsSection}>
        <h3 className={styles.foodsTitle}>Foods you should not eat</h3>
        <ol className={styles.foodsList}>
          {forbiddenFoods.map((item, index) => (
            <li key={`${item}-${index}`} className={styles.foodItem}>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        className={styles.submitBtn}
        onClick={onStartLosingWeight}
      >
        Start losing weight
      </button>
    </div>
  );
}