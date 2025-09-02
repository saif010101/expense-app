import React from 'react'

const Header = ({firstName,handleAddMealClick}) => {
  return (
    <div className="flex justify-between items-center mb-5">
        <h1 className="text-white text-[clamp(1.3rem,4vw,2.25rem)] font-bold">
          {firstName}'s Dashboard
        </h1>
        <button
          onClick={handleAddMealClick}
          className="hover:scale-[105%] font-[500] text-sm bg-white cursor-pointer text-nowrap px-[clamp(0.575rem,2.25vw,2rem)] py-[clamp(0.275rem,2vw,.5rem)] rounded-lg transition duration-200 ease-in"
        >
          + Add Meal
        </button>
      </div>
  )
}

export default Header