// Plans.jsx
import React, { useState, useEffect } from 'react';
import { fetchPlans } from './PlanFetcher';
import { useNavigate } from 'react-router-dom';
import fetchUser from '../auth/fetchUser';

export const Plans = () => {
  fetchUser()
  const [planArr, setPlanArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plans = await fetchPlans();
        setPlanArr(plans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-5">
      {planArr.map((plan) => (
        <div key={plan._id} className="bg-whitesmoke p-6 rounded-lg shadow-2xl mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{plan.name}</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Description</h2>
            <div className="text-gray-600">{plan.description}</div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Coverage</h2>
            <ul className="list-disc text-gray-600">
              {plan.coverage.map((coverage, index) => (
                <li key={index}>{coverage}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Target Audience</h2>
            <div className="text-gray-600">{plan.targetAudience}</div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Cost</h2>
            <div className="text-gray-600">
              <p>Premium: ${plan.cost.premium}</p>
              <p>Deductible: ${plan.cost.deductible}</p>
              <p>Co-payment: ${plan.cost.coPayment}</p>
              <p>Out of Pocket Max: ${plan.cost.outOfPocketMax}</p>
            </div>
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            onClick={() => navigate('/plan', { state: { plan } })}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};
