import { useState } from "react";
import { useUser } from "../context/customHook";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
   const { user, setUser } = useUser();
   const navigate = useNavigate();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleLogout = async () => {
      try {
         // ✅ Call your logout API
         await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });

         // ✅ Clear user from context and localStorage (handled automatically by context)
         setUser(null);

         // ✅ Redirect to login page
         navigate("/login");
      } catch (error) {
         console.error("Logout failed:", error);
         alert("Logout failed. Please try again.");
      }
   };

   return (
      <nav className="flex justify-between items-center p-3 bg-blue-600 text-white sticky top-0 z-50">
      {/* Left side — logo */}
      <div className="text-2xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
         DevTinder
      </div>

      {/* Right side — user dropdown */}
      {user && (
         <div
            className="relative inline-block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
         >
            <button className="flex items-center bg-white border border-gray-300 text-gray-800 px-3.5 py-1.5 rounded-full cursor-pointer text-sm hover:bg-gray-200 transition-colors">
            <span className="mr-2">
               <img
                  src={user.photoUrl}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full object-cover"
               />
            </span>
            <span className="username">{user?.firstName || "User"}</span>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
            <div className="absolute right-0 top-8 mt-2 min-w-[200px] bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden z-10">
               <Link
                  className="flex items-center px-3.5 py-2 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  to="/view-profile"
               >
                  <span className="mr-2.5">
                  <i className="fas fa-user"></i>
                  </span>
                  View Profile
               </Link>
               <Link
                  className="flex items-center px-3.5 py-2 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  to="/edit-profile"
               >
                  <span className="mr-2.5">
                  <i className="fas fa-tachometer-alt"></i>
                  </span>
                  Edit Profile
               </Link>
               <Link
                  className="flex items-center px-3.5 py-2 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  to="/user-connections"
               >
                  <span className="mr-2.5">
                  <i className="fas fa-tachometer-alt"></i>
                  </span>
                  Friends
               </Link>

               <Link
                  className="flex items-center px-3.5 py-2 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  to="/friend-requests"
               >
                  <span className="mr-2.5">
                  <i className="fas fa-tachometer-alt"></i>
                  </span>
                  Friend requests
               </Link>
               <p
                  className="flex items-center px-3.5 py-2 text-sm text-red-600 border-t border-gray-200 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  onClick={handleLogout}
               >
                  <span className="mr-2.5">
                  <i className="fas fa-sign-out-alt"></i>
                  </span>
                  Logout
               </p>
            </div>
            )}
         </div>
      )}
      </nav>
   );
};

export default Navbar;