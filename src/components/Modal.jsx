import { useState } from "react";

export default function Modal({isModalOpen}) {

    return (
        <>
        {isModalOpen && (
        <div className="absolute top-0 w-full h-screen flex justify-center items-center bg-black/30 ">
          <div className="p-4 bg-white flex flex-col gap-2 rounded-lg border-1 border-gray-400">
            <label className="font-[600]" htmlFor="paidBy">
              Paid by
            </label>
            <select
              className="border-1 border-gray-400 px-2 py-1 rounded-md"
              name="paid_by"
              id="paidBy"
            //   
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
              name="total_cost"
              id=""
            //   
            />
            <div className="">
              <span>Participated</span>
              <div>
                <input  type="checkbox" name="p230512" id="saif" />
                <label className="ml-2 font-[500]" htmlFor="saif">
                  Saif
                </label>
              </div>
              <div>
                <input  type="checkbox" name="p230627" id="fasih" />
                <label className="ml-2 font-[500]" htmlFor="fasih">
                  Fasih
                </label>
              </div>
              <div>
                <input  type="checkbox" name="p230672" id="yaqub" />
                <label className="ml-2 font-[500]" htmlFor="yaqub">
                  Yaqub
                </label>
              </div>
              <div>
                <input  type="checkbox" name="p230614" id="mahad" />
                <label className="ml-2 font-[500]" htmlFor="mahad">
                  Mahad
                </label>
              </div>
              <div>
                <input  type="checkbox" name="p230613" id="atif" />
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
    )
}