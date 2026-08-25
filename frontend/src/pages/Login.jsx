import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../main';
import { setSelectedUser, setUserData } from '../store/reducer/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err,setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

   const handleLogin= async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password
      },{withCredentials: true})
      dispatch(setUserData(result.data))
      dispatch(setSelectedUser(null))
      navigate("/")
      setEmail("")
      setPassword("")
      setLoading(false)
      setErr("")

    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response.data.message)
      
    }
  }


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Login to continue chatting
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter your email"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 pr-16 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {err && <p className='text-red-500'>{err}</p>}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 transition"
              disabled={loading}
            >
              {loading?"Loading...":"Log in"}
            </button>

          </form>
            <p className="text-center text-sm text-slate-400 mt-6">Need an account? <Link to="/signup">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

