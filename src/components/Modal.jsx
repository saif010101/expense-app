import { useState, useEffect, useRef } from "react";
import { useBtnRef } from "./btnContext";
import axios from "axios";

export default function Modal({
  handleMealSubmit,
  handleChange,
  isModalOpen = false,
  paid_by = "",
  closeModal,
}) {
  const modalRef = useRef(null);
  const btnRef = useBtnRef();
  const [studentsData, setStudentsData] = useState([]);
  const databaseHost = "localhost:3000";

  useEffect(() => {
    const handleOutsideClick = (event) => {

      // if click is made outside the modal
      if (!modalRef.current.contains(event.target) && event.target !== btnRef.current) {
        closeModal();
      }
    };
    const getStudentsData = async () => {
      const records = await axios.get(`http://${databaseHost}/students/`);
      setStudentsData(records.data);
    };
    document.addEventListener('click',handleOutsideClick);
    // return () => document.removeEventListener("click", handleOutsideClick);
    getStudentsData();
  }, []);

  return (
    <>
      <div
        data-modal-wrapper={isModalOpen ? "active" : "inactive"}
        className="fixed top-0 w-full h-screen opacity-0 bg-black/40 pointer-events-none transition duration-300 ease-in"
      >
        <div
          ref={modalRef}
          className="absolute top-1/2 left-1/2  transform-[translate(-50%,-50%)] w-8/10 max-w-[700px] p-5 md:p-6 bg-white flex flex-col gap-2 rounded-lg border-1 border-gray-400"
        >
          <div className="grid gap-1 md:grid-cols-2 md:gap-5">
            <div className="grid gap-1">
              {/* Paid by */}
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
                {studentsData.map((student) => (
                  <option value={student.username}>{student.fname}</option>
                ))}
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
                <span className="absolute top-1/2 -translate-y-[50%] right-2 p-1 font-bold">
                  PKR
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 my-3">
            <span className="font-[600]">Participated</span>
            {studentsData
              .filter((std) => std.username !== paid_by)
              .map((student) => (
                <div>
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    id={student.username}
                    name={student.username}
                  />
                  <label className="ml-2 font-[500]" htmlFor={student.username}>
                    {student.fname}
                  </label>
                </div>
              ))}
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
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleMealSubmit}
              className="font-[500] bg-green-400 hover:bg-green-300 px-3 py-2 cursor-pointer rounded-lg"
            >
              Add Meal
            </button>
            <button
              onClick={closeModal}
              className="font-[500] py-1 bg-transparent hover:bg-green-300 border-2 border-green-400  cursor-pointer rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
