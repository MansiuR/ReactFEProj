import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex w-full bg-gray-900 shadow-md">
      <div className="flex justify-end items-center h-16 px-6 space-x-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive ? "text-blue-500" : "text-white"
            } hover:text-blue-400 transition duration-300`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-sm font-semibold ${
              isActive ? "text-blue-500" : "text-white"
            } hover:text-blue-400 transition duration-300`
          }
        >
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
