import { useState, useMemo } from "react"
import { useTasks } from "../context/TaskContext"
import { Task } from "../types/task"

export function TaskList() {
  const { tasks } = useTasks()
  const [filter, setFilter] = useState<{
    status?: Task["status"]
    priority?: Task["priority"]
  }>({})

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        (!filter.status || task.status === filter.status) && (!filter.priority || task.priority === filter.priority)
    )
  }, [tasks, filter])

  return (
    <div>
      {/* 操作欄位 */}
      <h1 className="text-xl font-bold my-3">Control Panel</h1>
      <div className="flex">
        <select
          value={filter.status || ""}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              status: e.target.value as Task["status"],
            }))
          }
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filter.priority || ""}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              priority: e.target.value as Task["priority"],
            }))
          }
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {/* task 列表 */}
      <h1 className="text-xl font-bold my-3">Task list</h1>
      <div className="flex flex-col gap-2">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

function renderTaskActions(task: Task) {
  const { deleteTask, updateTask } = useTasks()

  const handleDelete = () => {
    // Potential UX anti-pattern
    const confirmDelete = window.confirm(`Delete task "${task.title}"?`)
    if (confirmDelete) {
      deleteTask(task.id)
    }
  }

  const handleStatusChange = () => {
    const statusMap: Record<Task["status"], Task["status"]> = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    }
    updateTask(task.id, { status: statusMap[task.status] })
  }

  return (
    <>
      <button className="border border-black rounded-md mr-2 p-1" onClick={handleStatusChange}>
        Change Status
      </button>
      <button className="border border-black rounded-md p-1" onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div className=" w-fit space-y-1 border p-3 border-gray-500 rounded-md" key={task.id}>
      <div className="flex gap-1">
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>
      {renderTaskActions(task)}
    </div>
  )
}
