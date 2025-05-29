import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const AuthForm = ({ role }) => {
const {auth} = useSelector((state) => state.counter)
console.log(auth)
  const [isLogin, setIsLogin] = useState(true); // Switch between Login and Register form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleInput, setRoleInput] = useState('');

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    
    // console.log('Username:', username);
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Role:', role);
  }

  return (
    <div className="relative h-screen bg-[#CDC8BC]">
      {/* Neumorphism Navigation Bar */}
      <div className="absolute px-34 top-0 w-full bg-[#f0f0f3b6] text-gray-800 py-4 px-8 rounded-b-lg shadow-lg shadow-[#e2e8f0]">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My App</h1>
          <ul className="flex space-x-22">
            <li><a href="/" className="hover:text-gray-500 text-2xl">Login</a></li>
            <li><a href="/about" className="hover:text-gray-500 text-2xl">Register</a></li>
 
          </ul>
        </nav>
      </div>

      {/* Background with vertical dotted lines */}
      <div className="absolute inset-0 grid grid-cols-12">
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
        <div className="border-l-2 border-dotted border-gray-400 h-full"></div>
      </div>

      {/* Centered Login/Register Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#FFFFFFAA] p-8 rounded-lg shadow-2xl shadow-[#e2e8f0] w-96 backdrop-blur-sm bg-opacity-40">
          <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
          
          {/* Toggle between Login and Register */}
          <div className="text-center mb-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </>
            )}

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    id="role"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter role"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
