import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Modal from "./components/Modal.jsx";
import axios from "axios";
import "./index.css";

function App() {
  // TODO : fetch students name from database instead of hardcoding it
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
    description : 'null'
  });


  const isStudentCheckBox = (targetElement) => {
    return targetElement.type === "checkbox";
  }

  const handleChange = (e) => {
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

  const handleMealSubmit = () => {
    axios.post("http://localhost:3000/addmeal",formData);
    toggleModal();
  }

  return (
    <>
      <Dashboard handleAddMealClick={toggleModal} />
      <Modal handleMealSubmit={handleMealSubmit} handleChange={handleChange} isModalOpen={isModalOpen} />
    </>
  );
}

export default App;
