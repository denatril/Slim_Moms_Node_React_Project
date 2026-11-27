
import { useState } from 'react';

import { Header } from '../../components/header/header';
import { DailyCaloriesForm } from '../../components/daily-calories-form/daily-calories-form';
import { Modal } from '../../components/modal/modal';
import { DailyCalorieIntake } from '../../components/daily-calorie-intake/daily-calorie-intake';

import vectorBg from '../../images/grialan.svg';
import leaf from '../../images/yaprak.svg';
import banana from '../../images/muz.svg';
import strawberry from '../../images/cilek.svg';

import styles from './main-page.module.css';

export function MainPage() {
    const [calorieResult, setCalorieResult] = useState(null);

    return (
        <div className={styles.pageWrapper}>
            <Header />

            <main className={styles.main}>
                <div className={styles.decorLayer} aria-hidden="true">
                    <img src={vectorBg} alt="" className={styles.vectorBgImg} />
                    <img src={leaf} alt="" className={styles.leafImg} />
                    <img src={banana} alt="" className={styles.bananaImg} />
                    <img src={strawberry} alt="" className={styles.strawberryImg} />
                </div>

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
        </div>
    );
}
