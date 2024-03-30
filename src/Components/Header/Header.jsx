import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from "../../assets/avatar.png";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store the current user

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user in state if authenticated
      } else {
        logoutFun();
      }
    });
  }, []);

  const logoutFun = () => {
    try {
      signOut(auth);
      navigate("/");
      setUser(null)
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user && (
            <img
              src={user.photoURL ? user.photoURL : avatar}
              alt="User"
              className="w-9 h-9 rounded-full mx-4"
            />
          )}
          {user && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logoutFun}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
