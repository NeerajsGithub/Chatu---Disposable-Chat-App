import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Link to="/auth/signin">SignIn</Link>
      <Link to="auth/signup">SignUp</Link>
      <Link to="room">Room</Link>
      <Outlet/>
    </div>
  )
}
