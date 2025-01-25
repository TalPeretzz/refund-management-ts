import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';

const AppRoutes: React.FC = () => {
  const userRole = 'manager';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage role={userRole} />} />
        {/* <Route path="/manager" element={<ManagerPage />} />
        <Route path="/account-manager" element={<AccountManagerPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
