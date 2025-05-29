import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RoleProtectedRoute = ({child,allowedRoles}) => {
const role = useSelector((state)=>state.counter)
console.log(role)
console.log(role)
if(!role || !allowedRoles.includes(role)){
    // return <Navigate to={"/unauthorized"}></Navigate>
}
  return child
  
}

export default RoleProtectedRoute
