import React from 'react';
import './App.css';
import './Css-folder/Nav.css';
import './Css-folder/why_chose_us.css';
import './Css-folder/HeroSection.css';
import './Css-folder/popularService.css';
import './Css-folder/TestimonialSection.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Layout from './components/Layout';
import { AuthProvide } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';




function App() {
  return (
    <div className='container'>
      <AuthProvide>
        <Nav/>
        <ScrollToTop/>
        <Layout/>
        <Footer/>
      </AuthProvide>
    </div>
);
}

export default App;