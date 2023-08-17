import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Home } from './pages/home/Home'
import { useDispatch } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Layout from './components/layout/Layout';
import Register from './pages/auth/Register.jsx';
import { Plans } from './pages/plans/Plans.jsx';
import { Plan } from './pages/plan/Plan.jsx';
import Login from './pages/auth/Login.jsx';
import { Home } from './pages/Home/Home.jsx';
import Claims from './pages/claims/Claims.jsx';
import ClaimStatus from './pages/claims/ClaimStatus.jsx';

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
        <Route path='/plan' element={
          <Layout>
            <Plan/>
          </Layout>
        }></Route>
        <Route path='/claims' element={
          <Layout>
            <Claims/>
          </Layout>
        }></Route>
        <Route path='/claimStatus' element={
          <Layout>
            <ClaimStatus/>
          </Layout>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
