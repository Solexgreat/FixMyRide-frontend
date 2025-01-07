import React, { useState } from 'react'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "") //remove non numeric
        console.log("Input value:", value);
        setPhoneNumber(value);

        if (value.length === 10 && !validatePhoneNumber(value)){
          toast.error('Invalid phone number! Enter a 10-digit number.');
        }
      }
  return (
    <div>
        <div className={'customerDetails'}>
        <div className='customerDetails-row'>
            <label htmlFor='Name' >Name</label>
            <input id='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}  required />
        </div>

        <div className='customerDetails-row' >
            <label htmlFor='email' >Email</label>
            <input id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div className='customerDetails-row' >
            <label htmlFor='phoneNumber' >Phone</label>
            <input id='phoneNumber'
            type='text'
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required />
        </div>
    </div>
    </div>
  )
}

export default Signup