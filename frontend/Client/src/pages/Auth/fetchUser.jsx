import axios from 'axios';
import { toast } from 'react-toastify';
import { SET_USER } from '../../redux/features/auth/authSlice';  // Adjust the path as necessary
import {store} from '../../redux/store';  // Import your Redux store

export const BACKEND_URL = "http://localhost:5000";

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (!token) {
      throw new Error('No token found, please login');
    }

    const response = await axios.get(`${BACKEND_URL}/api/users/getUser`, {
      withCredentials: true, // Send cookies with the request
    });
    // console.log(response);
    if (response.status === 200) {
      store.dispatch(SET_USER(response.data));  // Dispatch the SET_USER action with fetched user data
    //   toast.success('User data fetched successfully');
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export default fetchUser;
