import React, { useState, useEffect } from 'react';
import { fetchClaims, updateClaimStatus } from './ClaimFetcher';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';

const ClaimStatus = () => {
    const [claimArr, setClaimArr] = useState([]);
    const currentUser = useSelector(selectUser);

    useEffect(() => {
        const fetchClaimData = async () => {
            try {
                const claims = await fetchClaims(); // Assuming fetchClaims() fetches all claims

                // Filter claims based on user role
                let filteredClaims = [];
                if (currentUser.status === 'admin') {
                    filteredClaims = claims; // Show all claims for admin
                } else {
                    filteredClaims = claims.filter(claim => claim.user === currentUser.id);
                }

                setClaimArr(filteredClaims);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };

        fetchClaimData();
    }, [currentUser.id, currentUser.status]);

    const handleApprove = async (claimId) => {
        try {
            await updateClaimStatus(claimId, { status: 'Approved' });
            // Update claimArr state after successful update
            const updatedClaims = claimArr.map(claim => {
                if (claim._id === claimId) {
                    return { ...claim, status: 'Approved' };
                }
                return claim;
            });
            setClaimArr(updatedClaims);
        } catch (error) {
            console.error('Error approving claim:', error);
        }
    };

    const handleReject = async (claimId) => {
        try {
            await updateClaimStatus(claimId, { status: 'Rejected' });
            // Update claimArr state after successful update
            const updatedClaims = claimArr.map(claim => {
                if (claim._id === claimId) {
                    return { ...claim, status: 'Rejected' };
                }
                return claim;
            });
            setClaimArr(updatedClaims);
        } catch (error) {
            console.error('Error rejecting claim:', error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Your Claim Status</h1>
            {claimArr.length === 0 ? (
                <p className="text-gray-600">Loading claims...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {claimArr.map((claim) => (
                        <div key={claim._id} className="bg-white p-6 rounded-lg shadow-2xl">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{claim.plan.name}</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2 text-gray-700">Description</h3>
                                <p className="text-gray-600">{claim.plan.description}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2 text-gray-700">Status</h3>
                                <p className="text-gray-600">{claim.status}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2 text-gray-700">Doctor's Prescription</h3>
                                <img src={claim.doctorsPrescription} alt="Doctor's Prescription" className="max-w-full h-auto" />
                            </div>
                            {currentUser.status === 'admin' && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600 transition"
                                        onClick={() => handleApprove(claim._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleReject(claim._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClaimStatus;
