import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<string[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTask = task.trim()

    if (!trimmedTask) {
      return
    }

    setTasks((currentTasks) => [...currentTasks, trimmedTask])
    setTask('')
  }

  return (
    <main className="app-shell">
      <section className="task-card">
        <p className="eyebrow">Task tracker</p>
        <h1>Реалізуйте трекер завдань</h1>
        <p className="description">
          Додайте завдання у поле нижче, натисніть кнопку і побачите список
          нижче.
        </p>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="task-input">
            Назва завдання
          </label>
          <input
            id="task-input"
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Наприклад: підготувати звіт"
          />
          <button type="submit" disabled={!task.trim()}>
            Додати
          </button>
        </form>

        <div className="task-list-block" aria-live="polite">
          <div className="task-list-header">
            <h2>Список завдань</h2>
            <span>{tasks.length}</span>
          </div>

          {tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Поки що немає доданих завдань.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
