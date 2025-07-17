import React from "react"
import { TaskProvider } from "./context/TaskContext"
import { TaskList } from "./components/TaskList"
import { TaskForm } from "./components/TaskForm"

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="p-5">
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App
