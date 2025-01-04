import React, { useEffect } from 'react'
import { useFetchAllRevenues, useFetchAllRevenuesBetween } from '../Hook/useFetch'

function RevenueTable({filterDate}) {
    const {date: revenues, fetchData: fetchRevenues} = useFetchAllRevenues([])
    const {date: revenuesBetween, fetchData: localFetchRevenuesBetween} = useFetchAllRevenuesBetween([filterDate])

    useEffect(() => {
        const {start, end} = filterDate
        if (start){
            const currentEndDate = end || new Date().toISOString().split('T')[0];
            localFetchRevenuesBetween({startDate: start, endDate: currentEndDate})
        }
    }, [filterDate, fetchRevenues, localFetchRevenuesBetween])

    const dataToDisplay = filterDate.start || filterDate.end ? revenuesBetween: revenues;

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
                        {dataToDisplay && dataToDisplay.length > 0 ? (
                            dataToDisplay.map((item, index) => (
                                <tr key={index}>
                                    <td className='px-4 py-2'> {item.revenues.repair_name || "_"} </td>
                                    <td className='px-4 py-2'> {item.revenues.repair_price || "_"} </td>
                                    <td className='px-4 py-2'> {item.revenues.date|| "_"} </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td className="px-4 py-2" colSpan="3">
                                        No data available
                                    </td>
                                </tr>
                                )}
                    </tbody>
                    <tfoot>
                        {dataToDisplay && dataToDisplay.length > 0 ? (
                            dataToDisplay.map((item, index) => (
                             <tr>
                                <td className='px-4 py-2'> </td>
                                <td className='px-4 py-2'> {item.total_repair_revenue} </td>
                                <td className='px-4 py-2'> </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2" colSpan="3">
                                No data available
                                </td>
                            </tr>
                            )}
                    </tfoot>
                </table>
            </div>
        </div>
  )
}

export default RevenueTable