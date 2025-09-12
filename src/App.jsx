import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Modal from "./components/Modal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meals from "./pages/Meals.jsx";
import SuccessToast from "./components/SuccessToast.jsx";
import "./index.css";

function App() {
  const databaseHost = 'localhost:3000';

  const [refreshKey,setRefreshKey] = useState(0);
  const [isSuccessToastVisible, setSuccessToastVisible] = useState(false);
  const [isClearDataToastVisible, setClearDataToastVisible] = useState(false);
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
  
  const isStudentCheckBox = targetElement => {
    return targetElement.type === "checkbox";
  };

  const handleChange = e => {
    // target element name
    const targetElement = e.target;

    // check if given input tag is related to checkbox elements
    if (isStudentCheckBox(targetElement))
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

  const toggleSuccessToast = () => {
    setSuccessToastVisible(true);
    setTimeout(() => {setSuccessToastVisible(false)},3000);
  }
  const toggleClearDataToast = () => {
    setClearDataToastVisible(true);
    setTimeout(() => {setSuccessToastVisible(false)},3000);
  }

  // POST request made to the API to submit meal data
  const handleMealSubmit = () => {
    axios.post(`http://${databaseHost}/addmeal`, formData);
    toggleModal();
    toggleSuccessToast();
    setRefreshKey(refreshKey + 1); // trigger refresh
  };

  return (
    <>
      <SuccessToast visibility={isSuccessToastVisible} message="Meal data added successfully." />
      <SuccessToast visibility={isClearDataToastVisible} message="Khata cleared successfully." />
      <Navbar /> 
      <Routes>
        <Route path="/meals" element={<Meals />}></Route>
        <Route
          path="/"
          element={<Dashboard refreshKey={refreshKey} handleAddMealClick={toggleModal} toggleClearDataToast={toggleClearDataToast}/>}
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
