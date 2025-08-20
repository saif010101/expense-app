import { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toPayRecords, setToPayRecords] = useState([]);
  // const [data, setData] = useState("fasih");

  useEffect(() => {
    const getData = async () => {
      const records = await axios.get("http://localhost:3000/");
      setToPayRecords(records.data);
    };

    getData();
  });

  return (
    <>
      <main className="m-5 p-[clamp(0rem,4vw,15rem)]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[clamp(1.375rem,4vw,2.25rem)] font-bold">
            Fasih's Dashboard
          </h1>
          <button
            onClick={() => {
              setIsModalOpen((prev) => !prev);
            }}
            className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg"
          >
            + Add Meal
          </button>
        </div>
        <div className="p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg mb-5">
          <span className="font-[600]">
            Net Balance: <span className="ml-2">-150 PKR</span>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          {/* To Pay Card */}
          <div className="flex flex-col gap-2 p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg">
            <span className="font-bold text-xl">To Pay</span>
            {toPayRecords.map((record) => (
              <div className="flex justify-between items-center">
                <span className="font-[500]">{record.fname} - </span>
                <span className="mr-auto ml-2">Rs. {record.amount}</span>
                <button className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg">
                  Clear
                </button>
              </div>
            ))}
          </div>
          {/* To Recieve Card */}
          <div className="flex flex-col gap-2 p-4 bg-white border-1 border-gray-300 shadow-md rounded-lg">
            <span className="font-bold text-xl">To Receive</span>
            <div className="flex justify-between items-center">
              <span className="font-[500]">Ali - </span>
              <span className="mr-auto ml-2">Rs. 200</span>
              <button className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg">
                Clear
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-[500]">Hamza - </span>
              <span className="mr-auto ml-2">Rs. 100</span>
              <button className="text-white text-sm bg-blue-500 hover:bg-blue-400 cursor-pointer px-2 py-1 rounded-lg">
                Clear
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Dialog */}
      {isModalOpen && (
        <div className="absolute top-0 w-full h-screen flex justify-center items-center bg-black/30 ">
          <div className="p-4 bg-white flex flex-col gap-2 rounded-lg border-1 border-gray-400">
            <label className="font-[600]" htmlFor="paidBy">
              Paid by
            </label>
            <select
              className="border-1 border-gray-400 px-2 py-1 rounded-md"
              name=""
              id="paidBy"
            >
              <option value="Ali">Ali</option>
              <option value="Hamza">Hamza</option>
              <option value="Noor">Noor</option>
            </select>
            <label className="font-[600]" htmlFor="totalCost">
              Total cost
            </label>
            <input
              className="px-2 py-1 border-1 border-gray-400 rounded-md"
              type="text"
              name=""
              id=""
            />
            <div className="">
              <span>Participated</span>
              <div>
                <input type="checkbox" name="" id="saif" />
                <label className="ml-2 font-[500]" htmlFor="saif">
                  Saif
                </label>
              </div>
              <div>
                <input type="checkbox" name="" id="fasih" />
                <label className="ml-2 font-[500]" htmlFor="fasih">
                  Fasih
                </label>
              </div>
              <div>
                <input type="checkbox" name="" id="yaqub" />
                <label className="ml-2 font-[500]" htmlFor="yaqub">
                  Yaqub
                </label>
              </div>
              <div>
                <input type="checkbox" name="" id="mahad" />
                <label className="ml-2 font-[500]" htmlFor="mahad">
                  Mahad
                </label>
              </div>
              <div>
                <input type="checkbox" name="" id="atif" />
                <label className="ml-2 font-[500]" htmlFor="atif">
                  Atif
                </label>
              </div>
            </div>
            <button className="py-1 bg-blue-500 hover:bg-blue-400 rounded-md text-white">
              Add Meal
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
