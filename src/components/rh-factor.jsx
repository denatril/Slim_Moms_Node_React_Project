import RadioGroup from './radio-group'

const RH_OPTIONS = [
  { value: '+', label: 'Positive (+)' },
  { value: '-', label: 'Negative (−)' },
  { value: '', label: 'Unspecified' },
]

export default function RhFactor({ initialValue }) {
  return <RadioGroup legend="Rh factor" name="rhFactor" options={RH_OPTIONS} defaultValue={initialValue ?? ''} />
}
