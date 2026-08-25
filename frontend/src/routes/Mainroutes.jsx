import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Profile from '../pages/Profile'

const Mainroutes = () => {
  let {userData} = useSelector(state=>state.user)
  return (
    <Routes>
        <Route path='/signup' element={!userData?<Register />:<Navigate to="/profile" />}/>
        <Route path='/login' element={!userData?<Login />:<Navigate to="/" />}/>
        <Route path='/' element={userData?<Home />:<Navigate to="/login" />}/>
        <Route path='/profile' element={userData?<Profile />:<Navigate to="/signup" />}/>
    </Routes>
  )
}

export default Mainroutes