import React from 'react'

function RevenueTable() {
    const [filterDate, setFilterDate] = useState({ start: '', end: '' })
  return (
        <div>
             <div className='mb-6'>
                <h2 className='text-xl font-bold mb-2'>Total Revenue</h2>
                <table className='w-full text-left table-auto'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='px-4 py-2'>Repair</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='px-4 py-2'> </td>
                            <td className='px-4 py-2'> </td>
                            <td className='px-4 py-2'> </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='px-4 py-2'> Total </td>
                            <td className='px-4 py-2'> </td>
                            <td className='px-4 py-2'> </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
  )
}

export default RevenueTable