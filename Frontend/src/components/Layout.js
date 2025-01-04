 import React from "react"
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialSection from './components/TestimonialSection';
import PopularServices from './components/PopularServices';
import RevenueTable from './components/RevenueTable';
import AppointmentsTable from './components/AppointmentsTable';
import {Routes,  Route, useLocation } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Appointments from './components/Appointments';
import ServicePage from './components/ServicePage';
import ProtectedRoute from "../context/ProtectedRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";


 function Layout() {
    const location = useLocation();

    return (
      <div>
        <Routes>

          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <PopularServices />
                <WhyChooseUs />
                <TestimonialSection />
              </>
            }
          />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<ServicePage />} />

          <Route path="/dashboard/*" element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="dashboard/revenuesTable" element={
            <ProtectedRoute>
                <RevenueTable/>
            </ProtectedRoute>
            }/>
          <Route path="dashboard/appointmentsTable" element={
            <ProtectedRoute>
               <AppointmentsTable/>
            </ProtectedRoute>
            }/>
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/about" element={<ServicePage />} />
          <Route path="/contact" element={<ServicePage />} />
          <Route path="/sign-up" element={<ServicePage />} /> */}
        </Routes>
      </div>
    );
  }

export default Layout