import { useState,useEffect } from "react";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import axios from "axios";

export default function Dashboard({handleAddMealClick,refreshKey,toggleClearDataToast}) {
  const [refreshOnClear,setRefreshOnClear] = useState(0);
  const [toPayRecords,setToPayRecords] = useState([]);
  const [toReceiveRecords,setToReceiveRecords] = useState([]);
  const [firstName, setFirstName] = useState("");


  useEffect(() => {

    const userName = 'p230672';
    const databaseHost = 'localhost:3000';

    const getData = async () => {
      const records = await axios.get(`http://${databaseHost}/students/${userName}/khata`);
      setToPayRecords(records.data.to_pay);
      setToReceiveRecords(records.data.to_receive);
    }

    const getFirstName = async () => {
      const fname = await axios.get(`http://${databaseHost}/students/${userName}/fname`);
      setFirstName(fname.data);
    }

    getData();
    getFirstName();
    
  },[refreshKey,refreshOnClear]);

  // this will trigger refresh
  const toggleRefresh = () => {
    setRefreshOnClear(refreshOnClear + 1);
  }

  return (
    <main className="m-5 p-[clamp(0rem,4vw,17rem)]">
      <Header firstName={firstName} handleAddMealClick={handleAddMealClick}/>
      <div className="grid sm:grid-cols-2 gap-2">
        <Card heading={"To Pay"} data={toPayRecords} toggleClearDataToast={toggleClearDataToast} toggleRefresh={toggleRefresh}/>
        <Card heading={"To Receive"} data={toReceiveRecords} toggleClearDataToast={toggleClearDataToast} toggleRefresh={toggleRefresh}/>
      </div>
    </main>
  );
}
