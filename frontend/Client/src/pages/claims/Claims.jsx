import React, { useState, useEffect } from 'react';
import { fetchPlans } from '../plans/PlanFetcher';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import ClaimModal from './ClaimModal'; // Import the ClaimModal component

const Claims = () => {
    const user = useSelector(selectUser);
    const appliedPlans = user.appliedPlans || []; // Default to an empty array if undefined
    const [planArr, setPlanArr] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plans = await fetchPlans();
                // Filter plans to include only those whose IDs are in appliedPlans
                const filteredPlans = plans.filter(plan => appliedPlans.includes(plan._id));
                setPlanArr(filteredPlans);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchData();
    }, [appliedPlans]);

    const openModal = (planId) => {
        setSelectedPlanId(planId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPlanId(null);
    };

    return (
        <div className="container mx-auto p-5">
            {planArr.map((plan) => (
                <div key={plan._id} className="bg-white p-6 rounded-lg shadow-2xl mb-6">
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
                        onClick={() => openModal(plan._id)}
                    >
                        Claim Plan
                    </button>
                </div>
            ))}
            <ClaimModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                planId={selectedPlanId}
            />
        </div>
    );
}

export default Claims;
