import axios from "axios"

export const axiosInstancePublic = axios.create({
    baseURL:"http://localhost:3000",  // Change this to your backend URL//
    withCredentials:true, // Send cookies with requests//
})
// export default axiosInstance;
export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",  // Change this to your backend URL//
    withCredentials:true, // Send cookies with requests//
})