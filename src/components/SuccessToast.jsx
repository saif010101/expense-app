const SuccessToast = ({visibility,message = ""}) => {
  
  return (
    <div data-success-popup={visibility ? "toggle" : ""} className="fixed left-1/2 top-[-4rem] translate-x-[-50%] w-[90vw] max-w-[600px] mx-auto bg-green-800 rounded-xl shadow-md">
        <h1 className="text-white text-center text-lg font-bold">Success</h1>
        <p className="text-center text-green-200">{message}</p>
    </div>
  )
}

export default SuccessToast;