export default function RhFactor({ initialValue }) {
  return (
    <label className="rh-factor">
      Rh factor
      <select name="rhFactor" defaultValue={initialValue ?? ''}>
        <option value="">Unspecified</option>
        <option value="+">Positive (+)</option>
        <option value="-">Negative (−)</option>
      </select>
    </label>
  )
}
