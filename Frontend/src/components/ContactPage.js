import React from 'react'

function ContactPage() {
  return (
    <header>
       <div>
        <h1>Contact Us</h1>
        <p>Let's get your car back on road </p>
       </div>

         <div>
            <div>
                <h2>FixMyRide</h2>
                <h4><span>Phone:</span> 08063789756, 09020751168</h4>
                <h4><span>Email:</span> Fixmyride@gmail.com</h4>
                <h4><span>Address:</span> 123, olorunishola street,Ayobo, Lagos, Nigeria</h4>
                <h4><span>Opening Hours:</span> Mon - Sat: 8am - 6pm</h4>
            </div>

            <div>
                <h3>Find us Here:</h3>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35059.05650373603!2d3.2226051399084685!3d6.6051114451141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9a8952f3c043%3A0xc535e05cd3311792!2sAyobo%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1736241803231!5m2!1sen!2sng" 
                width="600" height="450"
                style="border:0;" allowfullscreen=""
                loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            
         </div>
    </header>
  )
}

export default ContactPage