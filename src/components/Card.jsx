import React from "react";

const Card = ({data}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg">
      <span className="font-bold text-xl">To Pay</span>
      {data.map((record) => (
        <div className="flex justify-between items-center">
          <span className="font-[500]">{record.fname} - </span>
          <span className="mr-auto ml-2">Rs. {record.amount}</span>
          <button className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg">
            Clear
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
