import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-center p-2 m-4 mx-auto w-[90vw] max-w-[500px] rounded-md bg-white shadow-md border-1 border-gray-300">
      <ul className="flex gap-10 underline">
        <a href="">
          <li>Dashboard</li>
        </a>
        <a href="">
          <li>Meals</li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
