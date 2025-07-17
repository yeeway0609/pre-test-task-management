import { useState, useMemo } from "react"
import { useTasks } from "../context/TaskContext"
import { Task, TaskStatus, TaskPriority } from "../types/task"

export function TaskList() {
  const { tasks } = useTasks()
  const [filter, setFilter] = useState<{
    status?: TaskStatus
    priority?: TaskPriority
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
              status: e.target.value as TaskStatus,
            }))
          }
        >
          <option value="">All Statuses</option>
          <option value={TaskStatus.TODO}>To Do</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.DONE}>Done</option>
        </select>

        <select
          value={filter.priority || ""}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              priority: e.target.value as TaskPriority,
            }))
          }
        >
          <option value="">All Priorities</option>
          <option value={TaskPriority.LOW}>Low</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.HIGH}>High</option>
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
    const statusMap: Record<TaskStatus, TaskStatus> = {
      [TaskStatus.TODO]: TaskStatus.IN_PROGRESS,
      [TaskStatus.IN_PROGRESS]: TaskStatus.DONE,
      [TaskStatus.DONE]: TaskStatus.TODO,
    }
    updateTask(task.id, { status: statusMap[task.status] })
  }

  return (
    <>
      <button className="border bg-blue-400 text-white rounded-lg mr-2 px-2 py-1" onClick={handleStatusChange}>
        Change Status
      </button>
      <button className="border bg-red-500 text-white rounded-lg px-2 py-1" onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div className=" w-fit space-y-2 border p-3 border-gray-500 rounded-md" key={task.id}>
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
