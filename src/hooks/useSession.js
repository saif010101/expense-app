import axios from "axios";
import { useState,useEffect } from "react";

const useSession = () => {
  
  const [userName,setUserName] = useState(null);

  useEffect(() => {
      
      const fetchUsername = async () => {
        const response = await axios.get("http://localhost:3000/username", {
          withCredentials: true,
        });
        setUserName(response.data.userName);
      };
    
      fetchUsername();

  },[]);

  return userName;

};

export { useSession };
