import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { useDispatch } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Layout from './components/layout/Layout';
import Register from './pages/auth/Register';
import { Plans } from './components/plans/Plans.jsx';
import Login from './pages/Auth/Login.jsx';

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        }></Route>
        <Route path='/plans' element={
          <Layout>
            <Plans />
          </Layout>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
