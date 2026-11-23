import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export default function DiaryDateCalendar({ date, onChange }) {
  return <DatePicker selected={date} onChange={onChange} dateFormat="dd.MM.yyyy" ariaLabelledBy="diary-date-label" />
}
