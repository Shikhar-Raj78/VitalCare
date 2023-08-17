import axios from 'axios';

export const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getAllPlans');
      return(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };
