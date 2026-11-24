import { useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DiaryDateCalendar({ date, onChange }) {
  const picker = useRef(null)
  return (
    <div className="diary-calendar">
      <DatePicker ref={picker} selected={date} onChange={onChange} dateFormat="dd.MM.yyyy" ariaLabelledBy="diary-date-label" />
      <button type="button" aria-label="Open calendar" onClick={() => picker.current?.setFocus()}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4m10-4v4M3 10h18" />
        </svg>
      </button>
    </div>
  )
}
