import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:8080/gastrolite/api`,
    // baseURL: `http://localhost:8080/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default api;