import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Register from '../screens/Register'


const AppRoutes = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                  </Routes>
            </BrowserRouter>
      )
}

export default AppRoutes