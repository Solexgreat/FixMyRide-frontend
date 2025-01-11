 import React from "react"
import '../Css-folder/Appointment.css';
import WhyChooseUs from './WhyChooseUs';
import TestimonialSection from './TestimonialSection';
import PopularServices from './PopularServices';
import RevenueTable from './RevenueTable';
import AppointmentsTable from './AppointmentsTable';
import {Routes,  Route, useLocation } from 'react-router-dom';
import HeroSection from './HeroSection';
import Appointments from './Appointments';
import ServicePage from './ServicePage';
import ProtectedRoute from "../context/ProtectedRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";
import CheckOutDialogBox from "./CheckOutDialogBox";
// import Signup from "./Signup";
import ContactPage from "./ContactPage";
import Signup from "./Signup";
import { AuthProvide } from "../context/AuthContext";


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

          <Route path="/dashboard" element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="revenuesTable" element={
            <ProtectedRoute>
              <RevenueTable/>
            </ProtectedRoute>
          }/>
          <Route path="appointmentsTable" element={
            <ProtectedRoute>
              <AppointmentsTable/>
            </ProtectedRoute>
            }/>
          <Route path="/login" element={<Login/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </div>
    );
  }

export default Layout