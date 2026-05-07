import axios from "axios"

const API = axios.create({

    baseURL: "http://teamtaskmanager-production-f9da.up.railway.app",

    headers: {
        "Content-Type": "application/json"
    }
})

export default API