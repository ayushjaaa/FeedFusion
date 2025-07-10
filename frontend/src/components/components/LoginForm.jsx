import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { login } from '../../features/auth/authSlice';
import { useTheme } from '@emotion/react';
const LoginForm = () => {
  const navigate = useNavigate();
  const b =  useSelector((state) => state.counter)
  console.log(b)
const theme = useTheme()
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RoleInput, setRoleInput] = useState("");

  useEffect(() => {
    // console.log("Auth state changed", auth);
  }, [auth]);

  function handleLoginSubmit(e) {
    e.preventDefault();

    if (RoleInput === "Admin" || RoleInput === "admin" || RoleInput === "User" || RoleInput === "user") {
    const a =  dispatch(login({ email, password, RoleInput,url:"/admin&user/login"}))
    .unwrap()
                .then((result) => {
                    console.log("Success:", result);
                    toast.success("Login successful");
                    navigate("/app/admin-dashboard");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Login failed");
                });

    } else if (RoleInput === "SuperAdmin" || RoleInput === "superadmin") {
     const a =  dispatch(login({ email, password, RoleInput,url:"/superadmin/login"}))
     .unwrap()
     .then((result) => {
         console.log("Success:", result);
         toast.success("Login successful");
         navigate("/app/dashboard");
     })
     .catch((error) => {
         console.error("Error:", error);
         toast.error("Login failed");
     });
    } else {
      console.error("Invalid Role");
    }
// console.log(a)

  }

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gradient-to-r bg-theme.palette.background.alt to-teal-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setRoleInput(e.target.value)}
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
            disabled={!email || !password || !RoleInput}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className0="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
