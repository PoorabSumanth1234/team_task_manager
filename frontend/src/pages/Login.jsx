import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

export default function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await API.post("/auth/login", form)

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role)

      alert("Login successful")

      navigate("/dashboard")

    } catch (err) {

      console.log(err)

      alert("Invalid credentials")

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Team Task Manager
          </h1>

          <p className="text-gray-400">
            Manage projects and team tasks efficiently
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-black outline-none"
              required
            />

          </div>

          <div className="mb-6">

            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-black outline-none"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-bold"
          >

            {
              loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-400 ml-2 hover:underline"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  )
}