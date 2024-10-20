import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3030/api"
})


//request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

//handle unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status == 401){
            localStorage.removeItem('token');
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;