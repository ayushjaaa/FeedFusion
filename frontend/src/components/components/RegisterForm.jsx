import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const theme = useTheme()
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [RoleInput, setRoleInput] = useState("");

  console.log(RoleInput)
  function loginSubmit(i) {
    i.preventDefault();
if(RoleInput === "Admin" || RoleInput === "admin"){
  dispatch(register({username,email,password,RoleInput,url:"http://localhost:3000/admin&user/register"})).unwrap()
.then((result)=>{
  console.log(result)
  toast.success("Registration successful");
  navigate("/login");
}).catch(((error)=>{
  console.log(error)
  toast.error("Registrantion error")
}))
}else if(RoleInput === "superadmin" || RoleInput === "SuperAdmin"){
  dispatch((register({username,email,password,RoleInput,url:"http://localhost:3000/superadmin/register"}))).unwrap()
  .then((result)=>{
    console.log(result)
    toast.success("Registration successfull")
    navigate("/login");
  })
}
}



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-theme.palette.background.alt to-teal-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <form className="space-y-6" onSubmit={loginSubmit}>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(i) => setusername(i.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(i) => setemail(i.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(i) => setpassword(i.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              value={RoleInput}
              onChange={(e) => setRoleInput(e.target.value  )}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!username || !email || !password || !RoleInput}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
