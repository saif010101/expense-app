import userLogo from "../assets/user.svg";
import triangleIcon from "../assets/triangle.svg";
import { useState } from "react";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="relative flex justify-center items-center w-10 md:w-35 h-10 bg-white rounded-full cursor-pointer">
      <div className="flex" onClick={toggleDropdown}>
        <img src={userLogo} alt="" />
        <span className="ml-2 hidden md:inline">p230672</span>
        <img data-caret-active={isVisible ? "true" : "false"} className="ml-2 transition duration-200 ease-in" src={triangleIcon} alt="" />
      </div>
      <ul
        data-dropdown-visible={isVisible ? "true" : "false"}
        className="absolute -left-6 md:right-0 top-11 flex flex-col gap-2 bg-white rounded-lg opacity-0 overflow-hidden transition duration-300 ease-in"
      >
        <li className="text-[0.75rem] p-1 text-center hover:bg-gray-100">Change User</li>
        <li className="text-[0.75rem] p-1 text-center hover:bg-gray-100">Settings</li>
        <li className="text-[0.75rem] p-1 text-center hover:bg-gray-100">Log Out</li>
      </ul>
    </div>
  );
};

export default Profile;
