
import { useState } from 'react';

import { DailyCaloriesForm } from '../../components/daily-calories-form/daily-calories-form';
import { Modal } from '../../components/modal/modal';
import { DailyCalorieIntake } from '../../components/daily-calorie-intake/daily-calorie-intake';

import styles from '../login-page/login-page.module.css';

export function MainPage() {
    const [calorieResult, setCalorieResult] = useState(null);

    return (
        <>
            <main className={styles.page}>
                <div className={styles.container}>
                    <DailyCaloriesForm onResult={setCalorieResult} />
                </div>
            </main>

            <Modal
                isOpen={Boolean(calorieResult)}
                onClose={() => setCalorieResult(null)}
            >
                {calorieResult && <DailyCalorieIntake
                    calories={calorieResult.calories}
                    forbiddenFoods={calorieResult.forbiddenFoods}
                    onStartLosingWeight={() => setCalorieResult(null)}
                />}
            </Modal>
        </>
    );
}
