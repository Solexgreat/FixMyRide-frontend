import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { API_BASE_URL } from '../constant'
import { toast } from 'react-toastify'

function Login() {
    const[setIsLoggedIn] = useAuth()
    const navigate = useNavigate()
    const[identifier, setIdentifier] = useState(" ")
    const[password, setPassword] = useState(" ")
    const [username, setUsername] = useState(" ")

    const handelLogin = async (e) => {
      e.preventDefault();

      const loginInfo = {
        email: identifier,
        username: identifier,
        password: password
      }

      try{
        const response = await fetch(`${API_BASE_URL}/auths/login`, {
          method: 'POST',
          hearders: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(loginInfo)
        });

        if (!response.ok){
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to Login')
          throw new Error ( errorData.message || 'Failed to Login')
        }

        const result = await response.json();
        const {token} = result //Getting the token
        const {username} = result //Get username

        if (token) {
          localStorage.setItem('sessionToken', token);
        }


        toast.success('Login successfull' , {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setUsername(username)
        setIsLoggedIn(true)
        navigate('/dashboard')
        return result
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white shadow-lg rounded-md'>
        <form onSubmit={handelLogin}>
          <fieldset className='space-y-4'>
            <div>
              <label htmlFor='Name'>Email/Username</label>
              <input
              id='Name'
              type='text'
              placeholder='Username or Email'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 shadow-custom-inner focus:ring-2 focus:ring-blue-500 '
              />
            </div>

            <div>
              <label htmlFor=''>Password</label>
              <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 shadow-custom-inner focus:ring-2 focus:ring-blue-500 '
              />
            </div>
          </fieldset>
          <button type='submit'
          className='block w-full px-4 py-2 mt-6 text-white bg-[#002B5B] rounded-full hover:bg-white
           hover:text-black hover:border hover:border-[#002B5B] transition duration-300 ease-in-out '
          >
            Login
            </button>
        </form>
      </div>
      <div>
        <Nav username={username} />
      </div>
    </div>
  )
}

export default Login