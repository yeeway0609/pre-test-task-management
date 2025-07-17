import { useTasks } from "../context/TaskContext"
import { Task, TaskStatus, TaskPriority } from "../types/task"

export function TaskForm() {
  const { addTask } = useTasks()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const taskData: Omit<Task, "id" | "createdAt"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as TaskStatus,
      priority: formData.get("priority") as TaskPriority,
    }
    addTask(taskData)
  }

  return (
    <div className="w-full max-w-[500px]">
      <h1 className="text-xl font-bold my-3">Task form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" name="title" placeholder="Task Title" className="border p-2 rounded-md" required />
        <textarea name="description" placeholder="Task Description" className="border p-2 rounded-md" required />

        <div className="flex gap-2">
          <select name="status" className="border flex-1 p-2 rounded-md" required>
            <option value="">Select Status</option>
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>

          <select name="priority" className="border flex-1 p-2 rounded-md" required>
            <option value="">Select Priority</option>
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Add Task
        </button>
      </form>
    </div>
  )
}
