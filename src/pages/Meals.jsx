import { useState, useEffect } from "react";
import axios from "axios";
import ParticipantsModal from "../components/ParticipantsModal.jsx";

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

  const [paginationList, setPaginationList] = useState([
    { value: 1, selected: true },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 4, selected: false },
    { value: 5, selected: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [modalData, setmodalData] = useState({});

  const databaseHost = "localhost:3000";

  // fetch meals data from database
  useEffect(() => {

    const index = paginationList.find(page => page.selected === true).value;
    const getMealsData = async () => {
      const records = await axios.get(`http://${databaseHost}/meals/${index}`);
      setMealsData(records.data);
    };

    getMealsData();
  }, [paginationList]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
    toggleModal();
  };

  const handlePaginationSelection = (index) => {
    const newList = paginationList.map((page) => {
      page.selected = page.value === index ? true : false;
      return page;
    });
    setPaginationList(newList);
  };

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
          toggleModal={toggleModal}
          modalData={modalData}
        />
      </div>
      <nav className="p-2 mx-auto mt-2 bg-transparent w-fit rounded-md">
        <ul className="flex gap-2">
          {paginationList.map((page) => (
            <li
              key={page.value}
              data-pagination-selected={page.selected ? "true" : "false"}
              className="py-2 px-4 rounded-md bg-white shadow-md hover:bg-white/80 cursor-pointer"
              onClick={() => {handlePaginationSelection(page.value)}}
            >
              {page.value}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Meals;
