import React, { useState } from 'react'
import '../Css-folder/Dashboard.css';
import { Link, useLocation } from 'react-router-dom';
import { AuthProvide, useAuth } from '../context/AuthContext';

function Dashboard() {
    const location = useLocation();
    const { setFilterDate } = useAuth();
    const [localFilterDate, setLocalFilterDate] = useState({ start: '', end: '' })

    const handleDateChange = (field, value) => {
        const updatedFilterDate = { ...localFilterDate, [field]: value };
        setLocalFilterDate(updatedFilterDate);
        setFilterDate(updatedFilterDate); // Update context
    };
  return (
    <div>
        <header className='p-6'>
            <section>
                <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
                <div className='gap-4'>
                    <h2>Name</h2>
                </div>
                <div className='flex gap-4 mb-6'>
                    <div>
                        <label className='block font-medium text-sm text-gray-950'> Start date </label>
                        <input
                            type='date'
                            value={localFilterDate.start}
                            onChange={(e) => handleDateChange({'start': e.target.value})}
                            className='p-2 mt-1 block w-full rounded-sm shadow-custom-inner border-gray-900'
                        />
                    </div>

                    <div>
                        <label className='block font-medium text-sm text-gray-950'> End date </label>
                        <input
                            type='date'
                            value={localFilterDate.end}
                            onChange={(e) =>  handleDateChange({'end': e.target.value})}
                            className='p-2 mt-1 block w-full rounded-sm shadow-custom-inner border-gray-900'
                        />
                    </div>
                </div>
                <div className='flex gap-4 mb-6'>
                    <div >
                        <h2 className={`text-xl font-bold ${location.pathname === '/revenuesTable' ? 'active-link' : ''}`}><Link to= "/revenuesTable">Revenues</Link></h2>
                    </div>

                    <div>
                        <h2 className={`text-xl font-bold ${location.pathname === '/appointmentsTable' ? 'active-link' : ''}`}><Link to ="/appointmentsTable">Appointments</Link></h2>
                    </div>
                </div>
            </section>
        </header>
    </div>
  )
}

export default Dashboard