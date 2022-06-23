import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' exact={true} element={<Navigate to='/' replace/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
