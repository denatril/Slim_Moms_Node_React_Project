export default function RightSideBar({ date, consumed = 0, dailyRate, foods }) {
  const remaining = dailyRate == null || consumed == null ? null : dailyRate - consumed
  const percent = dailyRate > 0 && consumed != null ? Math.round(consumed / dailyRate * 100) : null
  const value = (number, suffix) => number == null ? '—' : `${number} ${suffix}`
  return <aside className="right-sidebar"><section><h2>Summary for {date}</h2><dl><div><dt>Left</dt><dd>{value(remaining, 'kcal')}</dd></div><div><dt>Consumed</dt><dd>{value(consumed, 'kcal')}</dd></div><div><dt>Daily rate</dt><dd>{value(dailyRate, 'kcal')}</dd></div><div><dt>% of normal</dt><dd>{value(percent, '%')}</dd></div></dl></section><section><h2>Food not recommended</h2>{foods?.length ? <ul>{foods.map((food) => <li key={food}>{food}</li>)}</ul> : <p>{dailyRate ? 'Food recommendations are not available yet.' : 'Your diet will be displayed here'}</p>}</section></aside>
}
