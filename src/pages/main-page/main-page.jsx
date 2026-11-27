
import { useState } from 'react';

import { DailyCaloriesForm } from '../../components/daily-calories-form/daily-calories-form';
import { Modal } from '../../components/modal/modal';
import { DailyCalorieIntake } from '../../components/daily-calorie-intake/daily-calorie-intake';

import vectorBg from '../../images/grialan.svg';
import leaf from '../../images/yaprak1.webp';
import leafRetina from '../../images/yaprak2.webp';
import banana from '../../images/muz1.webp';
import bananaRetina from '../../images/muz2.webp';
import strawberry from '../../images/cilek1.webp';
import strawberryRetina from '../../images/cilek2.webp';

import styles from './main-page.module.css';

export function MainPage() {
    const [calorieResult, setCalorieResult] = useState(null);

    return (
        <div className={styles.pageWrapper}>


            <main className={styles.main}>
                <div className={styles.decorLayer} aria-hidden="true">
                    <img src={vectorBg} alt="" className={styles.vectorBgImg} />
                    <picture><source media="(min-width: 768px)" srcSet={`${leaf} 1x, ${leafRetina} 2x`} /><img alt="" className={styles.leafImg} /></picture>
                    <picture><source media="(min-width: 768px)" srcSet={`${banana} 1x, ${bananaRetina} 2x`} /><img alt="" className={styles.bananaImg} /></picture>
                    <picture><source media="(min-width: 768px)" srcSet={`${strawberry} 1x, ${strawberryRetina} 2x`} /><img alt="" className={styles.strawberryImg} /></picture>
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
