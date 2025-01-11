import React, { useEffect } from 'react'
import { useFetchAllAppointments, useFetchAllAppointmentsBetween } from '../Hook/useFetch'
import { useAuth } from '../context/AuthContext'
import Dashboard from './Dashboard'

function AppointmentsTable() {
  const{filterDate} = useAuth()
  const {date: appointments, fetchData: fetchAppointments} = useFetchAllAppointments([])
  const {date: appointmentsBetween, fetchData: localFetchAppointmentBetween} = useFetchAllAppointmentsBetween([filterDate])


  useEffect(() => {
    const token =  localStorage.getItem('sessionToken')
    if (!token) {
      console.error('No token found in localStorage');
    }
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
      const {start, end} = filterDate
      if (start){
          const currentEndDate = end || new Date().toISOString().split('T')[0];
          localFetchAppointmentBetween({startDate: start, endDate: currentEndDate})
      }
  }, [filterDate, localFetchAppointmentBetween])

  const dataToDisplay = filterDate.start || filterDate.end ? appointmentsBetween: appointments;
  return (
    <div>
      <div>
        <Dashboard />
      </div>
      <div className='mb-6 px-4'>
        <h2 className='text-xl font-bold mb-2'>Total Appointments</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Repair</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay && dataToDisplay.length > 0 ? (
            dataToDisplay.map((item, index) => {
              <tr>
                <td className="border px-4 py-2">{item.service_name}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.date}</td>
              </tr>
            })
          ) : (
            <tr>
            <td className="border px-4 py-2">No available data</td>
          </tr>
          ) }
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AppointmentsTable