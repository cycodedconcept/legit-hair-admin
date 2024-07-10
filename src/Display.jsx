import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

const Display = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default Display
