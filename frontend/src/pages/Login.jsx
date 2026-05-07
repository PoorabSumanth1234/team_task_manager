import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await API.post(

                "/api/auth/login",

                {
                    email,
                    password
                }
            )

            console.log("LOGIN RESPONSE:", response.data)

            localStorage.setItem(
                "token",
                response.data.token
            )

            alert("Login successful")

            navigate("/dashboard")

        } catch (error) {

            console.log("LOGIN ERROR:", error)

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Login failed"
            )
        }
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#020617"
            }}
        >

            <div
                style={{
                    width: "400px",
                    backgroundColor: "#1e293b",
                    padding: "40px",
                    borderRadius: "20px",
                    color: "white"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    Team Task Manager
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#cbd5e1"
                    }}
                >
                    Manage projects and team tasks efficiently
                </p>

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            style={inputStyle}
                        />

                    </div>

                    {/* PASSWORD */}

                    <div
                        style={{
                            marginBottom: "25px"
                        }}
                    >

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            style={inputStyle}
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "14px",
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </button>

                </form>

                <p
                    style={{
                        marginTop: "25px",
                        textAlign: "center"
                    }}
                >

                    Don’t have an account?{" "}

                    <Link
                        to="/signup"
                        style={{
                            color: "#3b82f6",
                            textDecoration: "none"
                        }}
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>
    )
}

const inputStyle = {

    width: "100%",

    padding: "12px",

    marginTop: "8px",

    borderRadius: "10px",

    border: "none",

    outline: "none",

    backgroundColor: "#334155",

    color: "white",

    fontSize: "15px"
}

export default Login