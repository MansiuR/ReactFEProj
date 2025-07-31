// import { NavLink } from "react-router-dom"

// const Navbar = () => {
//   return (
//     <div className="flex flex-row gap-4 place-content-evenly place-items-center">
//       <NavLink 
//         to="/">
//         Home
//         </NavLink>

//         <NavLink 
//         to="/pastes">
//            Paste
//         </NavLink>
//     </div> 
//   )
// }

// export default Navbar

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 shadow-md">
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
