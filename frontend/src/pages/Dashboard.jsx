import React, { useEffect, useState } from "react"
import API from "../services/api"

const Dashboard = () => {

    const [tasks, setTasks] = useState([])

    const [title, setTitle] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [projectId, setProjectId] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState("Low")
    const [status, setStatus] = useState("Todo")

    // FETCH TASKS

    const fetchTasks = async () => {

        try {

            const response = await API.get("/api/tasks/")

            console.log("TASKS:", response.data)

            setTasks(response.data)

        } catch (error) {

            console.log("FETCH TASK ERROR:", error)
        }
    }

    // CREATE TASK

    const createTask = async () => {

        try {

            const response = await API.post(

                "/api/tasks/",

                {
                    title,
                    assignedTo,
                    projectId,
                    deadline,
                    priority,
                    status
                }
            )

            console.log("TASK CREATED:", response.data)

            alert("Task created successfully")

            setTitle("")
            setAssignedTo("")
            setProjectId("")
            setDeadline("")
            setPriority("Low")
            setStatus("Todo")

            fetchTasks()

        } catch (error) {

            console.log("FULL ERROR:", error)

            console.log("ERROR RESPONSE:", error.response)

            alert(

                error.response?.data?.message ||

                error.response?.data?.error ||

                error.message ||

                "Failed to create task"
            )
        }
    }

    // UPDATE TASK STATUS

    const updateTaskStatus = async (
        taskId,
        newStatus
    ) => {

        try {

            await API.put(

                `/api/tasks/${taskId}`,

                {
                    status: newStatus
                }
            )

            fetchTasks()

        } catch (error) {

            console.log(error)

            alert("Failed to update task")
        }
    }

    useEffect(() => {

        fetchTasks()

    }, [])

    // FILTER TASKS

    const todoTasks = tasks.filter(
        (task) => task.status === "Todo"
    )

    const progressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    )

    const doneTasks = tasks.filter(
        (task) => task.status === "Done"
    )

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#020617",
                padding: "20px",
                color: "white"
            }}
        >

            {/* TOP STATS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={statsCard}>
                    <h2>Total Tasks</h2>
                    <h1>{tasks.length}</h1>
                </div>

                <div style={statsCard}>
                    <h2>Completed</h2>
                    <h1>{doneTasks.length}</h1>
                </div>

                <div style={statsCard}>
                    <h2>Pending</h2>
                    <h1>
                        {
                            todoTasks.length +
                            progressTasks.length
                        }
                    </h1>
                </div>

            </div>

            {/* CREATE TASK */}

            <div
                style={{
                    backgroundColor: "#1e293b",
                    padding: "30px",
                    borderRadius: "20px",
                    marginBottom: "40px"
                }}
            >

                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Create Task
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(6, 1fr)",
                        gap: "20px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="Assigned To"
                        value={assignedTo}
                        onChange={(e) =>
                            setAssignedTo(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="Project ID"
                        value={projectId}
                        onChange={(e) =>
                            setProjectId(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) =>
                            setDeadline(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    >

                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>

                    </select>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    >

                        <option>Todo</option>

                        <option>
                            In Progress
                        </option>

                        <option>Done</option>

                    </select>

                </div>

                <button
                    onClick={createTask}
                    style={{
                        marginTop: "25px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "14px 40px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}
                >
                    Create Task
                </button>

            </div>

            {/* TASK COLUMNS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr 1fr",
                    gap: "30px"
                }}
            >

                {/* TODO */}

                <div>

                    <h1
                        style={{
                            color: "#fb7185",
                            marginBottom: "20px"
                        }}
                    >
                        Todo
                    </h1>

                    {
                        todoTasks.map((task) => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                updateTaskStatus={
                                    updateTaskStatus
                                }
                            />

                        ))
                    }

                </div>

                {/* IN PROGRESS */}

                <div>

                    <h1
                        style={{
                            color: "#fde047",
                            marginBottom: "20px"
                        }}
                    >
                        In Progress
                    </h1>

                    {
                        progressTasks.map((task) => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                updateTaskStatus={
                                    updateTaskStatus
                                }
                            />

                        ))
                    }

                </div>

                {/* DONE */}

                <div>

                    <h1
                        style={{
                            color: "#22c55e",
                            marginBottom: "20px"
                        }}
                    >
                        Done
                    </h1>

                    {
                        doneTasks.map((task) => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                updateTaskStatus={
                                    updateTaskStatus
                                }
                            />

                        ))
                    }

                </div>

            </div>

        </div>
    )
}

// TASK CARD

const TaskCard = ({
    task,
    updateTaskStatus
}) => {

    return (

        <div
            style={{
                backgroundColor: "#1e293b",
                padding: "20px",
                borderRadius: "16px",
                marginBottom: "15px"
            }}
        >

            <h2>{task.title}</h2>

            <p>
                Assigned To: {task.assignedTo}
            </p>

            <p>
                Priority: {task.priority}
            </p>

            <p>
                Deadline: {task.deadline}
            </p>

            <select

                value={task.status}

                onChange={(e) =>
                    updateTaskStatus(
                        task._id,
                        e.target.value
                    )
                }

                style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#334155",
                    color: "white"
                }}
            >

                <option value="Todo">
                    Todo
                </option>

                <option value="In Progress">
                    In Progress
                </option>

                <option value="Done">
                    Done
                </option>

            </select>

        </div>
    )
}

const statsCard = {

    backgroundColor: "#1e293b",

    padding: "30px",

    borderRadius: "20px"
}

const inputStyle = {

    padding: "16px",

    borderRadius: "12px",

    border: "none",

    backgroundColor: "#334155",

    color: "white",

    fontSize: "16px",

    outline: "none"
}

export default Dashboard