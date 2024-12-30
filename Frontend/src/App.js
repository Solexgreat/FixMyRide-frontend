import React from 'react';
import './App.css';
import './Css-folder/Nav.css';
import './Css-folder/why_chose_us.css';
import './Css-folder/HeroSection.css';
import './Css-folder/popularService.css';
import './Css-folder/TestimonialSection.css';
import Nav from './components/Nav';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialSection from './components/TestimonialSection';
import PopularServices from './components/PopularServices';
import Footer from './components/Footer';
// import Main from './components/Main';
import {Routes,  Route, useLocation } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Appointments from './components/Appointments';
import ServicePage from './components/ServicePage';


function App() {
  return (
    <div className='container'>
      <Nav/>
      <Layout/>
      <Footer/>
    </div>
);
}

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
        {/* <Route path="/about" element={<ServicePage />} />
        <Route path="/contact" element={<ServicePage />} />
        <Route path="/login" element={<ServicePage />} />
        <Route path="/sign-up" element={<ServicePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
