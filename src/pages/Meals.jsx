import React from 'react'

const Meals = () => {
  return (
    <div className='shadow-md rounded-lg w-fit mx-auto overflow-hidden border-1 border-gray-400'>
      <table className='w-[90vw] max-w-[700px] text-center bg-white'>
        <thead className=''>
          <tr>
            <th className='px-1'>Description</th>
            <th className='px-1'>Amount</th>
            <th className='px-1'>Date</th>
            <th className='px-1'>Details</th>
          </tr>
        </thead>
        <tbody className='rounded-md bg-blue-200'>
          <tr>
            <td className='px-1 py-1'>Chicken Karahi</td>
            <td className='px-1 py-1'>800</td>
            <td className='px-1 py-1'>2025-08-17</td>
            <td className='text-blue-600 cursor-pointer underline px-1 py-1'>View</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Meals