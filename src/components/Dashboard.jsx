import { useState,useEffect } from "react";
import Header from "./Header";
import NetBalanceCard from "./NetBalanceCard";
import Card from "./Card";
import axios from "axios";

export default function Dashboard({handleAddMealClick}) {
  const [toPayRecords,setToPayRecords] = useState([]);
  const [toReceiveRecords,setToReceiveRecords] = useState([]);
  const [netBalance, setNetBalance] = useState(0);
  const [firstName, setFirstName] = useState("");


  useEffect(() => {

    const userName = 'p230512';

    const getToPayData = async () => {
      const records = await axios.get(`http://localhost:3000/${userName}/pay`);
      setToPayRecords(records.data);
    };

    const getToReceiveData = async () => {
      const records = await axios.get(`http://localhost:3000/${userName}/receive`);
      setToReceiveRecords(records.data);
    };

    const getNetAmount = async () => {
      const amount = await axios.get(`http://localhost:3000/${userName}/net`);
      setNetBalance(amount.data);
    }

    const getFirstName = async () => {
      const fname = await axios.get(`http://localhost:3000/${userName}/fname`);
      setFirstName(fname.data);
    }

    getToPayData();
    getToReceiveData();
    getNetAmount();
    getFirstName();
  },[]);


  return (
    <main className="m-5 p-[clamp(0rem,4vw,15rem)]">
      <Header firstName={firstName} handleAddMealClick={handleAddMealClick}/>
      <NetBalanceCard netBalance={netBalance}/>
      <div className="grid sm:grid-cols-2 gap-2">
        <Card data={toPayRecords}/>
        <Card data={toReceiveRecords}/>
      </div>
    </main>
  );
}
