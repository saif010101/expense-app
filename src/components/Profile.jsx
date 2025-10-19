import userLogo from "../assets/user.svg";
import triangleIcon from "../assets/triangle.svg";
import { useState,useRef,useEffect } from "react";
import { useSession } from "../hooks/useSession.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({toggleLoginStateFalse}) => {
  
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const userName = useSession();



  const openDropdown = () => {
    setIsVisible(true);
  };

  const closeDropdown = () => {
    setIsVisible(false);
  }

  const handleLogOut = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout",{withCredentials: true});
      navigate("/login");
      toggleLoginStateFalse();
    } catch (err) {
        console.log(err);
    }


  };

    useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("herererer33333333");
      // if click is made outside the modal
      if (!profileRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click',handleOutsideClick);

    // return () => document.removeEventListener('click',handleOutsideClick);

  }, []);

  return (
    <div ref={profileRef} className="relative flex justify-center items-center w-10 md:w-35 h-10 bg-white rounded-full cursor-pointer">
      <div className="flex" onClick={openDropdown}>
        <img src={userLogo} alt="" />
        <span className="ml-2 hidden md:inline">{userName}</span>
        <img data-caret-active={isVisible ? "true" : "false"} className="hidden md:block ml-2 transition duration-200 ease-in" src={triangleIcon} alt="" />
      </div>
      <ul
        data-dropdown-visible={isVisible ? "true" : "false"}
        className="w-14 absolute -left-3 md:w-36 md:right-0 top-11 flex flex-col gap-2 bg-white rounded-lg opacity-0 overflow-hidden transition duration-300 ease-in"
      >
        <li onClick={handleLogOut} className="text-[0.75rem] p-1 text-center hover:bg-gray-100">Log Out</li>
      </ul>
    </div>
  );
};

export default Profile;
