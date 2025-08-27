import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center p-2 m-4 mx-auto w-[90vw] max-w-[700px] rounded-md bg-white shadow-md border-1 border-gray-300">
      <ul className="flex gap-10 underline">
        <Link to="/">
          <li>Dashboard</li>
        </Link>
        <Link to="/meals">
          <li>Meals</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
