const SuccessPopUp = (isPopupVisible) => {
  return (
    <div data-success-popup={isPopupVisible ? "active" : "inactive"} className="fixed left-1/2 translate-x-[-50%] w-[90vw] max-w-[600px] mx-auto bg-green-800 rounded-xl shadow-md transition-all duration-500 ease-in-out">
        <h1 className="text-white text-center text-lg font-bold">Success</h1>
        <p className="text-center text-green-200">Meal data added succesfully</p>
    </div>
  )
}

export default SuccessPopUp;