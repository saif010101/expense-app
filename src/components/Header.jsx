import React from 'react'

const Header = ({firstName,handleAddMealClick}) => {
  return (
    <div className="flex justify-between items-center mb-5">
        <h1 className="text-[clamp(1.375rem,4vw,2.25rem)] font-bold">
          {firstName}'s Dashboard
        </h1>
        <button
          onClick={handleAddMealClick}
          className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg"
        >
          + Add Meal
        </button>
      </div>
  )
}

export default Header