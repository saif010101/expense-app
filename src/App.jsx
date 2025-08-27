import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Modal from "./components/Modal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meals from "./pages/Meals.jsx";

function App() {
  // TODOS : fetch students name from database instead of hardcoding it
  // add a close button to add meal form

  // Problems : when we add a meal using meal form, there is no default value for 'paid_by'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    paid_by: "",
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
          [targetElement.name]: e.target.checked,
        },
      });
      
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // POST request made to the API to submit meal data
  const handleMealSubmit = () => {
    axios.post("http://localhost:3000/addmeal", formData);
    toggleModal();
  };

  return (
    <>
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
      />
    </>
  );
}

export default App;
