import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import { AuthProvider } from './AuthContext.jsx';
import Layout from './layouts/index.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import CreateList from './pages/CreateList.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Project from './pages/Project/index.jsx';
import Signup from './pages/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Mapping from './pages/Mapping.jsx';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Unprotected Routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="createlist" element={<CreateList />} />
              <Route path="mapping/:id" element={<Mapping />} />
              <Route path="project/:id" element={<Project />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </AuthProvider>
  

  );
};

export default App;
