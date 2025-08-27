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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [modalData, setmodalData] = useState({});

  const databaseHost = "192.168.1.3:3000";

  // fetch meals data from database
  useEffect(() => {
    const getMealsData = async () => {
      const records = await axios.get(`http://${databaseHost}/meals`);
      setMealsData(records.data);
    };

    getMealsData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getModalData = async (meal_id) => {
    // TODO : get day and month from date

    // Get Meal Description and Amount
    const mealData = mealsData.find((meal) => meal.meal_id === meal_id);
    const date = mealData.date.slice(0, 10);
    const dateObj = new Date(date);

    const participantsData = await axios.get(
      `http://${databaseHost}/${meal_id}/participants`
    );

    mealData.participants = participantsData.data;
    mealData.dateInEnglish = {
      day: weekdays[dateObj.getDay()],
      month: months[dateObj.getMonth()],
      year: dateObj.getFullYear(),
    };
    console.log(mealData);
    setmodalData(mealData);
    toggleModal();
  };

  return (
    <div className="shadow-lg rounded-lg w-fit mx-auto overflow-hidden">
      <table className="w-[90vw] max-w-[700px] text-center bg-white">
        <thead className="">
          <tr>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1">Amount</th>
            <th className="px-2 py-1">Date</th>
            <th className="px-2 py-1">Details</th>
          </tr>
        </thead>
        <tbody className="rounded-md text-sm sm:text-lg">
          {mealsData.map((meal) => (
            <tr className="even:bg-green-200">
              <td className="px-2 py-3">{meal.description}</td>
              <td className="px-2 py-3">{meal.total}</td>
              <td className="px-2 py-3">2025-08-17</td>
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
      {
        <ParticipantsModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          modalData={modalData}
        />
      }
    </div>
  );
};

export default Meals;
