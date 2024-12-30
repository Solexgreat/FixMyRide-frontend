import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function Nav() {
	const[menuOpen, setMenuOpen] = useState(false);


	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	}
	return (
		<nav className='nav-bar'>
			<Link to='/' className="logo">
				<h1>FixMyRide</h1>
			</Link>
			<div className="nav-desktop">
				{/* <a href='/' className="logo"> */}
					{/* <h1>FixMyRide</h1> */}
				{/* </a> */}

				<ul>
					<li><Link to='/'>HOME</Link></li>
					<li><Link to='/about'>ABOUT</Link></li>
					<li><Link to='/services'>SERVICES</Link></li>
					<li><Link to='/contact'>CONTACT</Link></li>
				</ul>

				<div className="registration-btn">
					<button><Link to='/login' className='link-btn'>Login</Link></button>
					<button><Link to='/sign-up' className='link-btn' >Sign up</Link></button>
				</div>
			</div>

			{/*mobile menu*/}
			<div className="menu-bar" onClick={toggleMenu}>
				<div className="menu-bar bar"></div>
				<div className="menu-bar bar"></div>
				<div className="menu-bar bar"></div>
				<div className="menu-bar bar"></div>
			</div>

			<ul className={`nav-links ${menuOpen ? "visible": " "}`}>
				<li><Link to='/'>HOME</Link></li>
				<li><Link to='/about'>ABOUT</Link></li>
				<li><Link to='/services'>SERVICES</Link></li>
				<li><Link to='/contact'>CONTACT</Link></li>
				<li><Link to='/Login'>Login</Link></li>
				<li><Link to='/sign-up'>Sing up</Link></li>
			</ul>
		</nav>
	)
}

export default Nav