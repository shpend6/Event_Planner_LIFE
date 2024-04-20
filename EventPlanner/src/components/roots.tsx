import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeComponent from '../pages/HomePage';
import AdminComponent from '../pages/AdminPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/admin" element={<AdminComponent />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default AppRoutes;
