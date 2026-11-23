export function getDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return [year, month, day].join('-')
}

export function getDisplayDate(date) {
  return getDateKey(date).split('-').reverse().join('.')
}

export const selectDiaryProducts = (state) => state.diary.products
