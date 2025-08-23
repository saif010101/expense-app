import { useState } from "react";

export default function Modal({ handleMealSubmit, handleChange, isModalOpen }) {
  return (
    <>
      {isModalOpen && (
        <div className="absolute top-0 w-full h-screen flex justify-center items-center bg-black/30 ">
          <div className="w-8/10 max-w-[700px] p-4 bg-white flex flex-col gap-2 rounded-lg border-1 border-gray-400">
            <div className="grid gap-1 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="font-[600]" htmlFor="paidBy">
                  Paid by
                </label>
                <select
                  className="border-1 border-gray-400 px-2 py-1 rounded-md"
                  name="paid_by"
                  id="paidBy"
                  onChange={handleChange}
                  //
                >
                  <option value="p230512">Saif</option>
                  <option value="p230627">Fasih</option>
                  <option value="p230614">Mahad</option>
                  <option value="p23617">Atif</option>
                  <option value="p230672">Yaqub</option>
                </select>
              </div>
              <div className="grid gap-1">
                <label className="font-[600]" htmlFor="totalCost">
                  Total cost
                </label>
                <div className="relative ">
                  <input
                    className="w-full px-2 py-1 border-1 border-gray-400 rounded-md"
                    type="text"
                    name="total_cost"
                    id=""
                    onChange={handleChange}
                    //
                  />
                  <span className="absolute top-1/2 -translate-y-[50%] right-[0.01rem] inline-block bg-blue-200 rounded-md p-1 font-bold">
                    PKR
                  </span>
                </div>
              </div>
            </div>
            {/* Participated Students */}
            <div className="flex flex-col gap-2 my-3">
              <span className="font-[600]">Participated</span>
              <div>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="p230512"
                  id="saif"
                />
                <label
                  onChange={handleChange}
                  className="ml-2 font-[500]"
                  htmlFor="saif"
                >
                  Saif
                </label>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="p230627"
                  id="fasih"
                />
                <label className="ml-2 font-[500]" htmlFor="fasih">
                  Fasih
                </label>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="p230672"
                  id="yaqub"
                />
                <label className="ml-2 font-[500]" htmlFor="yaqub">
                  Yaqub
                </label>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="p230614"
                  id="mahad"
                />
                <label className="ml-2 font-[500]" htmlFor="mahad">
                  Mahad
                </label>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="p230613"
                  id="atif"
                />
                <label className="ml-2 font-[500]" htmlFor="atif">
                  Atif
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <label className="font-[600]" htmlFor="description">
                Description
              </label>
              <textarea
                onChange={handleChange}
                className="px-2 py-1 border-1 border-gray-400 rounded-md"
                name="description"
                id="description"
              ></textarea>
            </div>
            <button
              onClick={handleMealSubmit}
              className="py-1 bg-blue-500 hover:bg-blue-400 rounded-md text-white"
            >
              Add Meal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
