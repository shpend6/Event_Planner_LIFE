<<<<<<< HEAD
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeComponent from '../pages/HomePage'; // Update the path as per your file structure
import AdminComponent from '../pages/AdminPage'; // Update the path as per your file structure
=======
//import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeComponent from '../pages/HomePage'; // Update the path as per your file structure
import AboutComponent from '../pages/AdminPage'; // Update the path as per your file structure
>>>>>>> Besarta

function RRoutes() {
  return (
    <Routes>
    <Route path="/home" element={<HomeComponent />} />
<<<<<<< HEAD
    <Route path="/admin/*" element={<AdminComponent />} />
=======
    <Route path="/admin/*" element={<AboutComponent />} />
>>>>>>> Besarta
    </Routes>
  );
}

export default RRoutes;
