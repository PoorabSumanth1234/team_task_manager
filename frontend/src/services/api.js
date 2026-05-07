import axios from "axios"

const API = axios.create({
    baseURL: "https://teamtaskmanager-production-6675.up.railway.app/api",
    headers: {
        "Content-Type": "application/json"
    }
})

API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token")

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API