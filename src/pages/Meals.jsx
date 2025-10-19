import { useState, useEffect } from "react";
import axios from "axios";
import ParticipantsModal from "../components/ParticipantsModal.jsx";
import { useViewBtnRef } from "../components/btnContext.jsx";

const Meals = () => {
  // List of days
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  // List of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const viewBtnRef = useViewBtnRef();
  const [currentPage,setCurrentPage] = useState(1);
  const [paginationnList,setPaginationnList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [modalData, setmodalData] = useState({});
  
  const databaseHost = "localhost:3000";
  
  // fetch meals data from database
  useEffect(() => {
    
    // get total number of records in the meals table
    const getNumberOfPages = async () => {
      try {
        const response = await axios.get(`http://${databaseHost}/meals/numberOfRecords`);
        const {numberOfPages} = response.data;
        setPaginationnList(Array.from({length : numberOfPages},(v,i) => i + 1));

      } catch (err) {
          console.log("fdaf123");
      }
    }

    const getMealsData = async () => {
      const records = await axios.get(`http://${databaseHost}/meals/getMeals/${currentPage}`);
      setMealsData(records.data);
    };

    getNumberOfPages();
    getMealsData();
  }, [currentPage]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const getModalData = async (meal_id) => {
    // Get Meal Description and Amount
    const mealData = mealsData.find((meal) => meal.meal_id === meal_id);
    const date = mealData.date.slice(0, 10);
    const dateObj = new Date(date);

    const participantsData = await axios.get(
      `http://${databaseHost}/meals/${meal_id}/participants`
    );

    mealData.participants = participantsData.data;
    mealData.dateInEnglish = {
      day: weekdays[dateObj.getDay()],
      month: months[dateObj.getMonth()],
      year: dateObj.getFullYear(),
    };

    setmodalData(mealData);
    openModal();
  };

  // const handlePaginationSelection = (index) => {
  //   const newList = paginationList.map((page) => {
  //     page.selected = page.value === index ? true : false;
  //     return page;
  //   });
  //   setPaginationList(newList);
  // };

  return (
    <>
      <div className="shadow-lg rounded-lg w-fit mx-auto overflow-hidden">
        <table className="w-[90vw] max-w-[700px] text-center bg-white">
          <thead className="text-white bg-green-900">
            <tr>
              <th className="px-2 py-1">Description</th>
              <th className="px-2 py-1">Amount</th>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Details</th>
            </tr>
          </thead>
          <tbody className="rounded-md text-sm sm:text-lg">
            {mealsData.map((meal) => (
              <tr className="even:bg-green-300">
                <td className="px-2 py-3">{meal.description}</td>
                <td className="px-2 py-3">{meal.total}</td>
                <td className="px-2 py-3">{meal.date}</td>
                <td className="cursor-pointer p-1">
                  <span
                    onClick={() => {
                      getModalData(meal.meal_id);
                    }}
                    className="text-blue-600 underline"
                    ref={viewBtnRef}
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mealsData.length === 0 && (
          <p className="bg-white text-center">No Records Found</p>
        )}
        <ParticipantsModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalData={modalData}
        />
      </div>
      <nav className="p-2 mx-auto mt-2 bg-transparent w-fit rounded-md">
        <ul className="flex gap-2">
          {paginationnList && paginationnList.map((pageNo) => (
            <li
              key={pageNo}
              data-pagination-selected={pageNo === currentPage ? "true" : "false"}
              className="py-2 px-4 rounded-md bg-white shadow-md hover:bg-white/80 cursor-pointer"
              onClick={() => {setCurrentPage(pageNo)}}
            >
              {pageNo}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Meals;
