import { FormEvent, useState } from 'react'
import './App.css'

type Task = {
  id: string
  text: string
  completed: boolean
}

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTask = task.trim()

    if (!trimmedTask) {
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: `${Date.now()}-${Math.random()}`,
        text: trimmedTask,
        completed: false,
      },
    ])
    setTask('')
  }

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === taskId
          ? { ...currentTask, completed: !currentTask.completed }
          : currentTask,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="task-card">
        <p className="eyebrow">Task tracker</p>
        <h1>Реалізуйте трекер завдань</h1>
        <p className="description">
          Додайте завдання у поле нижче, натисніть кнопку і побачите список
          нижче. Клік по завданню позначає його як виконане.
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
              {tasks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`task-item ${item.completed ? 'task-item--completed' : ''}`}
                    onClick={() => toggleTask(item.id)}
                    aria-pressed={item.completed}
                  >
                    <span className="task-item__text">{item.text}</span>
                    <span className="task-item__status">
                      {item.completed ? 'Виконано' : 'Натисніть, щоб виконати'}
                    </span>
                  </button>
                </li>
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
