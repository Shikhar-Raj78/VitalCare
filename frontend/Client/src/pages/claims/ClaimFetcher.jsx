import axios from 'axios';

export const fetchClaims = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/fetchAllClaims');
      return(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
};

export const updateClaimStatus = async (claimId, statusData) => {
  const url = `http://localhost:5000/api/users/updateClaimStatus/${claimId}`;
  try {
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(statusData), // { status: 'Approved' or 'Rejected' }
          credentials: 'include', // Include cookies in the request
      });
      console.log(response.data);
      if (!response.ok) {
          throw new Error('Failed to update claim status');
      }

      const updatedClaim = await response.json();
      return updatedClaim;
  } catch (error) {
      console.error('Error updating claim status:', error);
      throw error;
  }
};

