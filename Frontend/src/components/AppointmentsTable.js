import React from 'react'

function AppointmentsTable() {
     const [filterDate, setFilterDate] = useState({ start: '', end: '' })
  return (
    <div className="p-6">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Repair</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Add dynamic rows here */}
          <tr>
            <td className="border px-4 py-2">Engine Repair</td>
            <td className="border px-4 py-2">Completed</td>
            <td className="border px-4 py-2">2024-12-28</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable