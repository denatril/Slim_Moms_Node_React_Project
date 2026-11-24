
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

const DEFAULT_RESULT = {
    calories: 2800,
    forbiddenFoods: ['Flour products', 'Milk', 'Red meat', 'Smoked meats'],
};

export function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calorieResult, setCalorieResult] = useState(DEFAULT_RESULT);

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
                    <DailyCaloriesForm
                        onResult={setCalorieResult}
                        onOpenModal={() => setIsModalOpen(true)}
                    />
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <DailyCalorieIntake
                    calories={calorieResult.calories}
                    forbiddenFoods={calorieResult.forbiddenFoods}
                    onStartLosingWeight={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
