import React from 'react'
import { Route,Routes} from 'react-router-dom'
// import LoginForm from '../../../components/components/LoginForm'
import RegisterForm from '../../../components/components/RegisterForm'
import Home from '../../../components/Home'
import DynamicTreeForm from '../../../components/components/DynamicTreeForm'
// import AdminDashboard from '../../../components/AdminDashboard'
import PostFromwraper from '../../../features/Postform/PostFromwraper'
const LoginRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<RegisterForm/>}/>

        <Route path='/rr' element={<AdminDashboard/>}/>

<Route path='/postform' element={<PostFromwraper/>}></Route>
   </Routes>
    </div>
  )
}

export default LoginRoute
