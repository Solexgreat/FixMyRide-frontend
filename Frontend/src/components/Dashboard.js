import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AppointmentsTable from './AppointmentsTable';
import RevenueTable from './RevenueTable';

function Dashboard() {
    const [filterDate, setFilterDate] = useState({ start: '', end: '' })
  return (
    <div>
        <header className='p-6'>
            <section>
                <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
                <div className='gap-4'>
                    <h2>Name</h2>
                </div>
                <div className='flex gap-4 mb-6'>
                    <div >
                        <h2 className='text-xl font-bold mb-4'><Link to= "dashboard/revenuesTable">Revenues</Link></h2>
                    </div>

                    <div>
                        <h2 className='text-xl font-bold mb-4'><Link to ="dashboard/appointmentsTable">Appointments</Link></h2>
                    </div>
                </div>
                <div className='flex gap-4 mb-6'>
                    <div>
                        <label className='block font-medium text-sm text-gray-950'> Start date </label>
                        <input
                            type='date'
                            value={filterDate.start}
                            onChange={(e) => setFilterDate({ ...filterDate, start: e.target.value})}
                            className='p-2 mt-1 block w-full rounded-sm shadow-custom-inner border-gray-900'
                        />
                    </div>

                    <div>
                        <label className='block font-medium text-sm text-gray-950'> End date </label>
                        <input
                            type='date'
                            value={filterDate.end}
                            onChange={(e) => setFilterDate({ ...filterDate, end: e.target.value})}
                            className='p-2 mt-1 block w-full rounded-sm shadow-custom-inner border-gray-900'
                        />
                    </div>
                </div>
            </section>
        </header>
        <div>
            <RevenueTable filterDate = {filterDate} />
            <AppointmentsTable filterDate = {filterDate} />
        </div>
    </div>
  )
}

export default Dashboard