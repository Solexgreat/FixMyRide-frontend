import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { API_BASE_URL } from '../constant'
import { toast, ToastContainer } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa';


function Login() {
    const{setisLoggedIn} = useAuth()
    const navigate = useNavigate()
    const[identifier, setIdentifier] = useState(" ")
    const[password, setPassword] = useState("")
    const [username, setUsername] = useState(" ")
    const[loading, setLoading] = useState(false)

    const handelLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      const loginInfo = {
        email: identifier,
        username: identifier,
        password: password
      }

      try{
        const response = await fetch(`${API_BASE_URL}/auths/login`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(loginInfo)
        });

        if (!response.ok){
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to Login')
          throw new Error (errorData.message || 'Failed to Login')
        }

        const result = await response.json();
        console.log('Login Response:', result);
        const {token} = result //Getting the token
        const {username} = result //Get username

        if (token) {
          localStorage.setItem('sessionToken', token);
          console.log('Token saved to localStorage:', token);
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
        setisLoggedIn(true)
        navigate('/dashboard')
        return result
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally{
        setLoading(false)
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
       <ToastContainer/>
      <div className='w-full max-w-md p-6 bg-white shadow-lg rounded-md'>
        <h1 className='text-2xl font-semibold text-center text-gray-950'>Login</h1>
        <form onSubmit={handelLogin}>
          <fieldset className='space-y-4'>
            <div>
              <label htmlFor='Name' className='block font-medium text-sm text-gray-950'>Email/Username</label>
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
              <label htmlFor='' className='block font-medium text-sm text-gray-950'>Password</label>
              <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 shadow-custom-inner focus:ring-2 focus:ring-blue-500 '
              />
            </div>
          </fieldset>
          <button type='submit'
          className={`block w-full px-4 py-2 mt-6 text-white bg-[#002B5B] rounded-full hover:bg-white
           hover:text-black hover:border hover:border-[#002B5B] transition duration-300 ease-in-out ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
           }`}

           disabled={loading}
          >
            {loading ? <FaSpinner className='inline-block w-6 h-6 mr-2 animate-spin' /> : null}
            {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login