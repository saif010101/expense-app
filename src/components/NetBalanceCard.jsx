import React from 'react';

const NetBalanceCard = ({netBalance}) => {
  return (
    <div className="p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg mb-5 ">
        <span className="font-[600]">
          Net Balance: <span className="ml-2">{netBalance} PKR</span>
        </span>
      </div>
  )
}

export default NetBalanceCard;