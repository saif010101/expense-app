import { useState,useEffect } from "react";
import Header from "../components/Header.jsx";
import NetBalanceCard from "../components/NetBalanceCard.jsx";
import Card from "../components/Card.jsx";
import axios from "axios";

export default function Dashboard({handleAddMealClick}) {
  const [toPayRecords,setToPayRecords] = useState([]);
  const [toReceiveRecords,setToReceiveRecords] = useState([]);
  const [netBalance, setNetBalance] = useState(0);
  const [firstName, setFirstName] = useState("");


  useEffect(() => {

    const userName = 'p230512';
    const databaseHost = 'localhost:3000';

    const getData = async () => {
      const records = await axios.get(`http://${databaseHost}/${userName}/account`);
      setToPayRecords(records.data.to_pay);
      setToReceiveRecords(records.data.to_receive);
    }

    const getNetAmount = async () => {
      const amount = await axios.get(`http://${databaseHost}/${userName}/net`);
      setNetBalance(amount.data);
    }

    const getFirstName = async () => {
      const fname = await axios.get(`http://${databaseHost}/${userName}/fname`);
      setFirstName(fname.data);
    }

    getData();
    getNetAmount();
    getFirstName();
    
  },[]);


  return (
    <main className="m-5 p-[clamp(0rem,4vw,17rem)]">
      <Header firstName={firstName} handleAddMealClick={handleAddMealClick}/>
      {/* <NetBalanceCard netBalance={netBalance}/> */}
      <div className="grid sm:grid-cols-2 gap-2">
        <Card heading={"To Pay"} data={toPayRecords}/>
        <Card heading={"To Receive"} data={toReceiveRecords}/>
      </div>
    </main>
  );
}
