import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Nav({username}) {
	const[menuOpen, setMenuOpen] = useState(false);
	const{isLoggedIn} = useAuth()


	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	}
	return (
		<nav className='nav-bar'>
			<Link to='/' className="logo">
				<h1>FixMyRide</h1>
			</Link>
			<div className="nav-desktop">
				<ul>
					<li><Link to='/'>HOME</Link></li>
					<li><Link to='/about'>ABOUT</Link></li>
					<li><Link to='/services'>SERVICES</Link></li>
					<li><Link to='/contact'>CONTACT</Link></li>
				</ul>

				{isLoggedIn ? (
					<div className='flex item-center space-x-4'>
						<span className='text-lg'>welcome, {username}</span>
						<div>
							<Link to='/dashboard'><i className='fas fa-user-cycle text-2xl'></i></Link>
						</div>
					</div>
				) : (
					<div className="registration-btn">
						<button><Link to='/login' className='link-btn'>Login</Link></button>
						<button><Link to='/sign-up' className='link-btn' >Sign up</Link></button>
					</div>
				)}
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