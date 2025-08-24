import { useState } from "react";

export default function Modal({
  handleMealSubmit,
  handleChange,
  isModalOpen = false,
}) {
  return (
    <>
      <div
        onClick={(e) => {
          e.target.dataset.modalwrapper = "inactive";
        }}
        data-modalWrapper={isModalOpen ? "active" : "inactive"}
        className="fixed top-0 w-full h-screen opacity-0 bg-black/40 pointer-events-none transition-all duration-500 ease-in"
      >
        <div
          className={`absolute  top-1/2 left-1/2 transform-[translate(-50%,-50%)] w-8/10 max-w-[700px] p-4 md:p-6 bg-white flex flex-col gap-2 ${
            !isModalOpen && "translate-y-[520px]"
          }  rounded-lg border-1 border-gray-400 transition-all duration-600 ease-out`}
        >
         
        </div>
      </div>
    </>
  );
}
