import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Modal from "./components/Modal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Meals from "./pages/Meals.jsx";
import Login from "./pages/Login.jsx";
import SuccessToast from "./components/SuccessToast.jsx";
import "./index.css";

function App() {

  
  const databaseHost = "localhost:3000";
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
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
      p230519: false,
    },
    description: "null",
  });
  
  const toggleLoginState = () => {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const response = await axios.get("http://localhost:3000/",{withCredentials: true});
        toggleLoginState();
      } catch (err) {    

        if (err.response.status !== 200) {
          navigate("/login");
        }
      }
    
    }
    validateLogin(); 

  },[])
  
  const isStudentCheckBox = (targetElement) => {
    return targetElement.type === "checkbox";
  };

  const handleChange = (e) => {
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
    setIsModalOpen((prev) => !prev);
  };

  const toggleSuccessToast = () => {
    setSuccessToastVisible(true);
    setTimeout(() => {
      setSuccessToastVisible(false);
    }, 3000);
  };
  const toggleClearDataToast = () => {
    setClearDataToastVisible(true);
    setTimeout(() => {
      setSuccessToastVisible(false);
    }, 3000);
  };

  // POST request made to the API to submit meal data
  const handleMealSubmit = async () => {
    await axios.post(`http://${databaseHost}/meals/add`, formData);
    toggleModal();
    toggleSuccessToast();
    setRefreshKey(refreshKey + 1); // trigger refresh
  };


  return (
    <>
      <SuccessToast
        visibility={isSuccessToastVisible}
        message="Meal data added successfully."
      />
      <SuccessToast
        visibility={isClearDataToastVisible}
        message="Khata cleared successfully."
      />
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/meals" element={<Meals />}></Route>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard
                refreshKey={refreshKey}
                handleAddMealClick={toggleModal}
                toggleClearDataToast={toggleClearDataToast}
                toggleLoginState={toggleLoginState}
              />
            ) : (
              <Login toggleLoginState={toggleLoginState}/>
            )
          }
        ></Route>
        <Route path="/login" element={<Login toggleLoginState={toggleLoginState} />}></Route>
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
