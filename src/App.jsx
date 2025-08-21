import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Modal from "./components/Modal.jsx";

import "./index.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData,setFormData] = useState({
    paid_by : '',
    total_cost : 0,
    participated : {
      p230512 : false,
      p230627 : false,
      p230614 : false,
      p230672 : false,
      p230613 : false
    }
  });


  console.log(formData);
  const handleChange = (e) => {
    const targetName = e.target.name;
    console.log(e.target.value);
    if (targetName.slice(0,3) === "p23") {
      setFormData({ ...formData, participated:{...formData.participated,[targetName] : e.target.value }});
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }
  

  return (
    <>
      <Dashboard handleAddMealClick={toggleModal} />
      <Modal isModalOpen={isModalOpen}/>
    </>
  );
}

export default App;
