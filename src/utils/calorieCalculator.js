
const FORBIDDEN_FOODS_BY_BLOOD_TYPE = {
  1: ['Flour products', 'Milk', 'Red meat', 'Smoked meats'],
  2: ['Meat', 'Dairy products', 'Wheat', 'Tomatoes'],
  3: ['Corn', 'Lentils', 'Peanuts', 'Sesame seeds'],
  4: ['Red meat', 'Kidney beans', 'Seeds', 'Corn'],
};

export function calculateDailyCalories({
  height,
  age,
  currentWeight,
  desiredWeight,
  bloodType,
}) {
  const h = Number(height);
  const a = Number(age);
  const current = Number(currentWeight);
  const desired = Number(desiredWeight);
  const type = Number(bloodType) || 1;

  // Women's daily calorie intake formula
  const calories = Math.round(
    10 * current +
    6.25 * h -
    5 * a -
    161 -
    10 * (current - desired)
  );

  const forbiddenFoods =
    FORBIDDEN_FOODS_BY_BLOOD_TYPE[type] ||
    FORBIDDEN_FOODS_BY_BLOOD_TYPE[1];

  return {
    calories,
    forbiddenFoods,
  };
}
