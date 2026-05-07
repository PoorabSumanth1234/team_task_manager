import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"

export default function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
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

      const res = await API.post(
        "/auth/signup",
        form
      )

      console.log(res.data)

      alert("Signup successful!")

      navigate("/")

    } catch (err) {

      console.log(err.response)

      if (err.response?.data?.message) {

        alert(err.response.data.message)

      } else {

        alert("Server error")
      }

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h1>

          <p className="text-gray-400">
            Join Team Task Manager
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-gray-300 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-black outline-none"
              required
            />

          </div>

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

          <div className="mb-4">

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

          <div className="mb-6">

            <label className="block text-gray-300 mb-2">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-black outline-none"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-lg font-bold text-white"
          >

            {
              loading
              ? "Creating Account..."
              : "Signup"
            }

          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-blue-400 ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}