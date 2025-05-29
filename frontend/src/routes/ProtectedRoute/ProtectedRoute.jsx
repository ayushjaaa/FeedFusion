import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {token} = useSelector((state)=>state.counter.auth)
// console.log(token)
if(!token){
    return <Navigate to={"/login"} replace></Navigate>
}
  return (
 children
  )
}

export default ProtectedRoute
