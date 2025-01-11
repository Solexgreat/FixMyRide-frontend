import React, { useState } from 'react'
import '../Css-folder/signup.css'
import { toast, ToastContainer } from 'react-toastify'
import { validatePhoneNumber } from '../utils/validationUtils'
import { API_BASE_URL } from '../constant'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa';

function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('user')
    const [password, setPassword] = useState('')
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // const handlePhoneNumberChange = (e) => {
    //     const value = e.target.value.replace(/[^0-9]/g, "") //remove non numeric
    //     console.log("Input value:", value);
    //     setPhoneNumber(value);

    //     if (value.length === 10 && !validatePhoneNumber(value)){
    //       toast.error('Invalid phone number! Enter a 10-digit number.');
    //     }
    //   }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        const data = {
            first_name: firstName,
            last_name: lastName,
            user_name: username,
            email,
            user_type: userType,
            password

        }
        try {
            const response = await fetch(`${API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            console.log('response:', response)

            if(!response.ok) {
              const errorData = await response.json()
              console.log('response:', errorData)
              if(response.status === 409){
                toast.error(errorData.error || 'Email or username already exists')
                  return
              }
              throw new Error(errorData.error || 'Failed to signup')
            }

            const result = await response.json()

            if (result) {
                toast.success('Signup successfull', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }

            setFirstName('')
            setlastName('')
            setUsername('')
            setEmail('')
            setUserType('User')
            navigate('/login')
        }
        catch (error) {
            toast.error(`Error: ${error.error}`)
        } finally {
          setLoading(false)
        }
    }
  return (
    <section className='signup'>
      <ToastContainer/>
      <div className='signup-header'>
        <h1>Sign Up For Special Discount</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className='flex space-between space-x-3'>
              <div className='customerDetails-row'>
                <label htmlFor='Name' >First Name</label>
                <input id='Name'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}  required />
              </div>

              <div className='customerDetails-row'>
                <label htmlFor='Name' >Last Name</label>
                <input id='Name'
                type='text'
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}  required />
              </div>
            </div>

            <div className='customerDetails-row' >
              <label htmlFor='email' >Email</label>
              <input id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            </div>

            <div className='customerDetails-row'>
                <label htmlFor='Name' >Username</label>
                <input id='Name'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}  required />
            </div>

            <div className='customerDetails-row'>
              <label htmlFor='password'>Password</label>
              <input id='password' type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            </div>

            <label htmlFor='Usertype'>User Type</label>
            <div className='flex items-center space-x-2'>
              <input
                type="radio"
                id="mechanic"
                name="Usertype"
                value="MECHANIC"
                onClick={(e) => setUserType(e.target.value)}
              />
              <label htmlFor="mechanic" className='cursor-pointer mt-2'>Mechanic</label>
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
            {loading ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
      </div>
    </section>
  )
}

export default Signup