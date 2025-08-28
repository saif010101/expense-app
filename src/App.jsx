import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Modal from "./components/Modal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meals from "./pages/Meals.jsx";
import SuccessPopUp from "./components/SuccessPopUp.jsx";
import "./index.css";

function App() {
  const databaseHost = 'localhost:3000';
  // TODOS : fetch students name from database instead of hardcoding it
  // add a close button to add meal form
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    paid_by: "p230512",
    total_cost: 0,
    participated: {
      p230512: false,
      p230627: false,
      p230614: false,
      p230672: false,
      p230613: false,
    },
    description: "null",
  });
  
  console.log(formData);
  const isStudentCheckBox = targetElement => {
    return targetElement.type === "checkbox";
  };

  const handleChange = e => {
    // target element name
    const targetElement = e.target;

    // check if given input tag is related to checkbox elements
    if (isStudentCheckBox(targetElement))
      // console.log("here")
      setFormData({
        ...formData,
        participated: {
          ...formData.participated,
          [targetElement.name]: targetElement.checked,
        },
      });
      
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const toggleSuccessPopUp = () => {
    setIsPopupVisible(prev => !prev);
  }

  // POST request made to the API to submit meal data
  const handleMealSubmit = () => {
    axios.post(`http://${databaseHost}/addmeal`, formData);
    toggleModal();
    toggleSuccessPopUp();
  };

  return (
    <>
      <SuccessPopUp isPopupVisible={isPopupVisible} />
      <Navbar /> 
      <Routes>
        <Route path="/meals" element={<Meals />}></Route>
        <Route
          path="/"
          element={<Dashboard handleAddMealClick={toggleModal} />}
        ></Route>
      </Routes>
      <Modal
        handleMealSubmit={handleMealSubmit}
        handleChange={handleChange}
        isModalOpen={isModalOpen}
        paid_by={formData.paid_by}
        toggleModal={toggleModal}
      />
    </>
  );
}

export default App;
