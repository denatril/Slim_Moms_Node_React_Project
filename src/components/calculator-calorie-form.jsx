import { useState } from 'react'

export default function CalculatorCalorieForm({ onCalculate, profile, pending }) {
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const height = Number(data.get('height'))
    const age = Number(data.get('age'))
    const weight = Number(data.get('weight'))
    const goal = Number(data.get('goal'))
    const rate = Math.round(10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - goal))

    if (!Number.isFinite(rate) || rate <= 0) {
      setError('Check your measurements. These values do not produce a positive result.')
      return
    }

    setError('')
    onCalculate({ height, age, currentWeight: weight, desiredWeight: goal, bloodType: Number(data.get('bloodType')) })
  }

  return (
    <form className="calculator-form" onSubmit={submit} onChange={() => setError('')}>
      <div className="calculator-fields">
        <div className="calculator-column">
          <label><input aria-label="Height (cm)" placeholder="Height (cm) *" name="height" defaultValue={profile?.height} type="number" min="0.1" step="any" required /></label>
          <label><input aria-label="Age" placeholder="Age *" name="age" defaultValue={profile?.age} type="number" min="1" step="1" required /></label>
          <label><input aria-label="Current weight (kg)" placeholder="Current weight (kg) *" name="weight" defaultValue={profile?.currentWeight} type="number" min="0.1" step="any" required /></label>
        </div>
        <div className="calculator-column">
          <label><input aria-label="Desired weight (kg)" placeholder="Desired weight (kg) *" name="goal" defaultValue={profile?.desiredWeight} type="number" min="0.1" step="any" required /></label>
          <fieldset>
            <legend>Blood type *</legend>
            <div className="calculator-options">
              {[1, 2, 3, 4].map((type) => (
                <label key={type}>
                  <input name="bloodType" type="radio" value={type} required defaultChecked={String(type) === String(profile?.bloodType ?? 1)} />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      {error && <p role="alert" className="calculator-error">{error}</p>}
      <button disabled={pending} type="submit" className="feature-button">Start losing weight</button>
    </form>
  )
}
