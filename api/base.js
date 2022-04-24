import axios from "axios"

// Configuration for requests
const axiosConfig = Object.freeze({
    baseURL: 'https://www.notexponential.com/aip2pgaming/api/rl/gw.php',
    timeout: 100000,
    withCredentials: true,
})

const axiosInstance = axios.create(axiosConfig)

axiosInstance.interceptors.request.use((config) => {
    config.headers.common['userId'] = "1097";
    config.headers.common['x-api-key'] = "d4e411860e5bc0ce0739";
    config.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    return config
})

export default axiosInstance