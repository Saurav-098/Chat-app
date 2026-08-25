import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/reducer/UserSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err,setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const handleSignup= async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        username,email,password
      },{withCredentials: true})
      dispatch(setUserData(result.data))
      navigate("/profile")
      setUsername("")
      setEmail("")
      setPassword("")
      setLoading(false);
      setErr("")
      
    } catch (error) {
      console.log(error)
      setLoading(false);
      setErr(error?.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Create your account to start chatting
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>
            {err && <p className='text-red-500'>{err}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 transition"
              disabled={loading}
            >
             {loading?"Loading...":"Sign up"}
            </button>

          </form>

          {/* Login */}
             <p className="text-center text-sm text-slate-400 mt-6">Already have an account? <Link to="/login" className="">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;