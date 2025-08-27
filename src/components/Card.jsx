import axios from "axios";

const Card = ({heading,data}) => {
  const fn = fname => {
    axios.delete(`http://localhost:3000/users/${fname}`);
  }
  return (
    <div className="flex flex-col gap-2 p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg ">
      <span className="font-bold text-xl">{heading}</span>
      {data.map((record) => (
        <div className="flex justify-between items-center">
          <span className="font-[500]">{record.fname} - </span>
          <span className="mr-auto ml-2">Rs. {record.amount}</span>
          <button onClick={() => fn(record.fname)} className="text-white text-sm bg-green-400 hover:bg-green-300 cursor-pointer px-2 py-1 rounded-lg">
            Clear
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
