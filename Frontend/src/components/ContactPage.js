import React, { useState } from 'react'
import { toast } from 'react-toastify';

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
    }
  return (
    <header className="bg-[#F5F5F5] py-10">
       <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-2'>Contact Us</h1>
        <p className='text-lg italic text-gray-600 mb-2'>Let's get your car back on road... </p>
       </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 mb-6">
            <div className="bg-white shadow-md rounded-lg p-6 lg:col-span-1">
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>FixMyRide</h2>
                <ul className="space-y-3 text-gray-750">
                    <li><span className="font-bold">Phone:</span> 08063789756, 09020751168</li>
                    <li><span className="font-bold">Email:</span> Fixmyride@gmail.com</li>
                    <li><span className="font-bold">Address:</span> 123, Olorunishola Street, Ayobo, Lagos, Nigeria</li>
                    <li><span className="font-bold">Opening Hours:</span> Mon - Sat: 8am - 6pm</li>
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 lg:col-span-1">
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Find us Here:</h3>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35059.05650373603!2d3.2226051399084685!3d6.6051114451141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9a8952f3c043%3A0xc535e05cd3311792!2sAyobo%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1736241803231!5m2!1sen!2sng" 
                width="600" height="450"
                style={{ border: 0 }} allowfullscreen=""
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                className="w-full aspect-video rounded-lg"
                >
                </iframe>
            </div>
        </div>

        <div>
            <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10 mb-10'>
                <form onSubmit={handleSubmit} className='max-w-6xl space-y-4'>
                    <fieldset>
                        <legend className='text-2xl font-bold text-gray-800 mb-4'>Send us a message</legend>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='First Name' for="name"
                                className='block font-semibold text-gray-800 mb-2'
                                >
                                   First Name:
                                </label>
                                <input type="text" id="name" name="name" required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full border border-gray-300 rounded-md p-2
                                shadow-custom-inner
                                focus:ring-2 focus:ring-blue-500 outline-none mb-3'
                                />
                            </div>
                            <div>
                                <label htmlFor='last name' for="last name"
                                className='block font-semibold text-gray-800 mb-2'
                                >
                                   Last Name:
                                </label>
                                <input type="text" id="name" name="name" required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full border border-gray-300 rounded-md p-2
                                shadow-custom-inner
                                focus:ring-2 focus:ring-blue-500 outline-none mb-3'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='email' for="email"
                            className='block font-semibold text-gray-800 mb-2'
                            >
                                Email:
                            </label>
                            <input type="email" id="email" name="email" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border border-gray-300 rounded-md p-2
                            shadow-custom-inner
                            focus:ring-2 focus:ring-blue-500 outline-none mb-3'
                            />
                        </div>
                        <div>
                            <label for="message"
                            className='block font-semibold text-gray-800 mb-2'
                            >
                                Message:
                            </label>
                            <textarea id="message" name="message" required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full border border-gray-300 rounded-md p-2
                            shadow-custom-inner
                            focus:ring-2 focus:ring-blue-500 outline-none mb-3'
                            rows="5"
                            ></textarea>
                        </div>
                        <button type="submit"
                        className='text-2xl bg-[#002B5B] rounded border py-2 px-10 mx-auto
                        text-white hover:bg-white hover:text-[#333333] hover:border-[#333333]'
                        >
                            Send
                        </button>
                    </fieldset>
                </form>
            </div>
         </div>
    </header>
  )
}

export default ContactPage