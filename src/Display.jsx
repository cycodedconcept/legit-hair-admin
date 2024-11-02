// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Login from './components/Login';

// const Display = () => {
//   const authToken = localStorage.getItem('key');

//   return (
//     <React.Fragment>
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<Login />} />
//           <Route
//             path="/dashboard"
//             element={authToken ? <Dashboard /> : <Navigate to="/" />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </React.Fragment>
//   )
// }

// export default Display

// Display.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

const PrivateRoute = ({ children }) => {
  const { successful } = useSelector((state) => state.login);
  const authToken = localStorage.getItem('key');
  
  if (!successful && !authToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { successful } = useSelector((state) => state.login);
  const authToken = localStorage.getItem('key');
  
  if (successful || authToken) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const Display = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Display;