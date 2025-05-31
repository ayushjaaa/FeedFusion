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

export const refreshAccessToken = async()=>{
    const response = await axiosInstance.get("http://localhost:3000/api/auth/refresh-token")
    const newAccessToken = response
    return newAccessToken
    API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
}

export const setAuthToken = token =>{
    if(token){
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
    }else{
        delete axiosInstance.defaults.headers.common[`Authorization`]
    }
}