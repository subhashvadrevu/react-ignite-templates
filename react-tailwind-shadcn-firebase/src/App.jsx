import React, { useEffect, useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile'
import { auth } from './components/firebase/firebase'

const App = () => {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [])

  return (
    <div>
      <Navbar />

      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={user ? <Navigate to={"/profile"} /> : <Login /> } />
        <Route path='/signup' element={user ? <Navigate to={"/profile"} /> : <Register /> } />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App