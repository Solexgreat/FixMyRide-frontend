import React from 'react'
import CheckOutButton from './CheckOutButton';

function CheckOutDialogBox({isOpen, onClose, handleSubmit, price, description}) {
  if (!isOpen) return null; // Only render if open

  return (
    <div className='fixed inset-0 bg-[#002B5B] bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-lg  w-96 p-6'>
        <h3>Payment choice</h3>
        <div className='flex justify-between items-center border-b pb-3'>
          <h2>
            You can choose to pay now or at the workshop
          </h2>
        </div>
        <div onClick={onClose} className='flex justify-between space-x-4  mt-6' >
        <CheckOutButton price={price} description={description}/>

         <button onClick={handleSubmit}
         className='px-2 py-2 text-white  rounded border bg-[#002B5B]
         hover:bg-white hover:text-[#333333] hover:border-[#333333]'
         >
          Pay at the  workshop
         </button>
        </div>
      </div>
    </div>
  )
}

export default CheckOutDialogBox;