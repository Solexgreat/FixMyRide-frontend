import React from 'react'
import { useAuth } from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
import Nav from './Nav'

function Login() {
    const[setIsLoggedIn] = useAuth()
    const navigate = useNavigate()

    const handelLogin = () => {


        setIsLoggedIn(true)
        navigate
    }
  return (
    <Nav handelLogin={handelLogin()} />
  )
}

export default Login