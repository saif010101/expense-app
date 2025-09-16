import { Link } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center gap-3 md:gap-10">
      <nav className="flex justify-center p-2 my-4 w-[80vw] max-w-[700px] rounded-md bg-white shadow-md border-1 border-gray-300 cursor-pointer hover:-translate-y-[2px] transition duration-300 ease-in">
        <ul className="flex gap-10 underline">
          <Link to="/">
            <li>Dashboard</li>
          </Link>
          <Link to="/meals">
            <li>Meals</li>
          </Link>
        </ul>
      </nav>
      <Profile/>
    </div>
  );
};

export default Navbar;
