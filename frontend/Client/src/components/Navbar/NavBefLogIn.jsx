import React, { useState } from "react";
import vitalcare_logo from "../../assets/vitalcare_logo.png";
import { Link } from "react-router-dom";
export const NavBefLogIn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={vitalcare_logo} className="h-24" alt="VitalCare Logo" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto` }id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-b-2 border-gray-100  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-green-1000">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 hover:text-green-950"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 hover:text-green-950"
                >
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 hover:text-green-950"
                >
                  Claim
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 hover:text-green-950"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
