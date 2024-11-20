import React from 'react'
import HeroSection from './HeroSection';
import Appointments from './Appointments';

function Main() {


  return (
    <main>
        <Routes>
            <Route path="/" element={<HeroSection/>} />
            <Route path="/" element={<Appointments/>} />
        </Routes>
    </main>
  )
}

export default Main