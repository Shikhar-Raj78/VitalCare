import React from "react";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export const Cards = ({ img, title, overview }) => {
  const Navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="h-2/3 border-b border-gray-200">
        <img src={img} alt="card-img" className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{overview}</p>
        <button
          className="self-start bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={() => {
            isLoggedIn ? Navigate("/plans") : Navigate("/login");
          }}
        >
          View Plan
        </button>
      </div>
    </div>
  );
};
