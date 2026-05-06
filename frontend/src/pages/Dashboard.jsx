import { useEffect, useState } from "react"
import API from "../services/api"

export default function Dashboard() {

  const [tasks, setTasks] = useState([])

  const [search, setSearch] = useState("")

  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    projectId: "",
    deadline: "",
    priority: "Medium"
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks/")

      setTasks(res.data)

    } catch (err) {

      console.log(err)

    }
  }

  const createTask = async () => {

    try {

      await API.post("/tasks/", newTask)

      fetchTasks()

      setNewTask({
        title: "",
        assignedTo: "",
        projectId: "",
        deadline: "",
        priority: "Medium"
      })

    } catch (err) {

      console.log(err)

    }
  }

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status
      })

      fetchTasks()

    } catch (err) {

      console.log(err)

    }
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  const todoTasks = filteredTasks.filter(
    t => t.status === "todo"
  )

  const progressTasks = filteredTasks.filter(
    t => t.status === "in-progress"
  )

  const doneTasks = filteredTasks.filter(
    t => t.status === "done"
  )

  const renderTaskCard = (task) => (

    <div
      key={task._id}
      className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition"
    >

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-xl font-bold">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded text-sm font-bold
            ${
              task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
            }
          `}
        >
          {task.priority}
        </span>

      </div>

      <p className="mb-2 text-gray-300">
        Assigned To: {task.assignedTo}
      </p>

      <p className="mb-2 text-gray-300">
        Deadline: {task.deadline}
      </p>

      {
        new Date(task.deadline) < new Date()
        && task.status !== "done" && (

          <p className="text-red-500 font-bold mb-2">
            ⚠ Overdue
          </p>
        )
      }

      <p
        className={`mb-4 font-bold
          ${
            task.status === "done"
            ? "text-green-400"
            : task.status === "in-progress"
            ? "text-yellow-400"
            : "text-red-400"
          }
        `}
      >
        Status: {task.status}
      </p>

      <select
        className="text-black p-2 rounded w-full"
        defaultValue={task.status}
        onChange={(e) =>
          updateStatus(task._id, e.target.value)
        }
      >
        <option value="todo">todo</option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>

    </div>
  )

  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

        <div>

          <h1 className="text-4xl font-bold">
            Team Task Dashboard
          </h1>

          <p className="text-gray-400">
            Role: {localStorage.getItem("role")}
          </p>

        </div>

        <button
          onClick={() => {
            localStorage.clear()
            window.location.href = "/"
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-gray-800 p-5 rounded-xl">
          <h2>Total Tasks</h2>
          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h2>Completed</h2>
          <p className="text-3xl font-bold">
            {tasks.filter(t => t.status === "done").length}
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h2>Pending</h2>
          <p className="text-3xl font-bold">
            {tasks.filter(t => t.status !== "done").length}
          </p>
        </div>

      </div>

      <div className="bg-gray-800 p-5 rounded-xl mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Create Task
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            placeholder="Title"
            className="p-3 rounded text-black"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value
              })
            }
          />

          <input
            placeholder="Assigned To"
            className="p-3 rounded text-black"
            value={newTask.assignedTo}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignedTo: e.target.value
              })
            }
          />

          <input
            placeholder="Project ID"
            className="p-3 rounded text-black"
            value={newTask.projectId}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                projectId: e.target.value
              })
            }
          />

          <input
            type="date"
            className="p-3 rounded text-black"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                deadline: e.target.value
              })
            }
          />

          <select
            className="p-3 rounded text-black"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value
              })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          onClick={createTask}
          className="bg-blue-500 px-5 py-3 rounded mt-4 hover:bg-blue-600"
        >
          Create Task
        </button>

      </div>

      <input
        placeholder="Search tasks..."
        className="p-3 rounded text-black mb-8 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {
        tasks.length === 0 && (

          <div className="text-center text-gray-400">
            No tasks available
          </div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>

          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Todo
          </h2>

          <div className="space-y-4">
            {todoTasks.map(renderTaskCard)}
          </div>

        </div>

        <div>

          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            In Progress
          </h2>

          <div className="space-y-4">
            {progressTasks.map(renderTaskCard)}
          </div>

        </div>

        <div>

          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Done
          </h2>

          <div className="space-y-4">
            {doneTasks.map(renderTaskCard)}
          </div>

        </div>

      </div>

    </div>
  )
}