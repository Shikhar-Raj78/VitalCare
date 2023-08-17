import React, { useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      // console.log(data)
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      await dispatch(SET_USER(data))
      localStorage.setItem('token', data.token)
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-5">
      {isLoading && <Loader />}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <TiUserAddOutline size={35} color="#38a169" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Login
        </h2>
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-6 text-gray-600 space-x-2">
          <Link to="/" className="text-green-900 hover:underline">
            Home
          </Link>
          <p>Do not have an account?</p>
          <Link to="/register" className="text-green-900 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
