import React, { useState, useRef, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
// import { GiHydra } from "react-icons/gi";
import { MdLogout } from "react-icons/md";

const Account = ( {onLoginClick, onRegisterClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    window.location.reload(); // Reload the page to reflect the changes
  };
  console.log("User:", user);
  if (!user) {
    return (
      <div className="flex gap-4 h-15 pt-5 pb-5 justify-end mr-4">
        <button
          className="flex items-center gap-2 bg-white text-[#1e1e1e] font-semibold rounded-2xl py-1 px-2 hover:bg-[#e3e3e3] transition"
          onClick={onLoginClick}
        >
          Login
        </button>
        <button
          className="flex items-center gap-2 border border-[#d9d9d9] text-[#d9d9d9] font-semibold rounded-2xl py-1 px-2 hover:bg-[#343434] transition"
          onClick={onRegisterClick}
        >
          Register
        </button>
      </div>
    );
  }

  return (
    <div className="user-container h-15">
      {/* <GiHydra className="logo-icon" /> */}
      <HiOutlineUserCircle
        className="user-icon"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div
          ref={containerRef}
          className="absolute left-600 top-20 w-56 h-35 drop-shadow-sm border border-[#424242] rounded-lg shadow-md bg-[#1e1e1e] z-50"
        >
          <>
            <div className="mb-2">
              <p className="text-white pl-3 mt-2 mb-0 text-lg]">
                {user.name}
              </p>
              <p className="text-[#808080] ml-3 text-sm">
                {user.email}
              </p>
              <hr className="w-[90%] mx-3 items-center border-[#424242]"></hr>
            </div>
            <button
              className="w-full gap-2 flex items-center py-2 px-3 text-white bg-[#1e1e1e] rounded-lg hover:bg-[#424242]"
              onClick={handleLogout}
            >
              <MdLogout /> Log Out
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default Account;
