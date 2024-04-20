import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeComponent from '../pages/HomePage'; // Update the path as per your file structure
import AdminComponent from '../pages/AdminPage'; // Update the path as per your file structure

function RRoutes() {
  return (
    <Routes>
    <Route path="/home" element={<HomeComponent />} />
    <Route path="/admin/*" element={<AdminComponent />} />
    </Routes>
  );
}

export default RRoutes;
