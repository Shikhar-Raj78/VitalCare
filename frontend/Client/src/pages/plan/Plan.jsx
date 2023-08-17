import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from '../../redux/features/auth/authSlice';
import fetchUser from "../auth/fetchUser";

export const Plan = () => {
  const { state } = useLocation();
  const selectedPlan = state?.plan;
  const user = useSelector(selectUser);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/applyForPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ email: user.email, plan: selectedPlan }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Plan applied successfully!");
        navigate('/plans'); // Redirect to plans after success
        fetchUser()
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while applying for the plan.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Apply for {selectedPlan.name}
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Description:</h3>
            <p className="text-gray-600">{selectedPlan.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Coverage:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {selectedPlan.coverage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Target Audience:</h3>
            <p className="text-gray-600">{selectedPlan.targetAudience}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Cost:</h3>
            <p className="text-gray-600">Premium: ${selectedPlan.cost.premium}</p>
            <p className="text-gray-600">Deductible: ${selectedPlan.cost.deductible}</p>
            <p className="text-gray-600">Co-payment: ${selectedPlan.cost.coPayment}</p>
            <p className="text-gray-600">Out of Pocket Max: ${selectedPlan.cost.outOfPocketMax}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
