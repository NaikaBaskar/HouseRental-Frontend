import React, {useState} from 'react'
import logo from '../images/i.png'


function Navbar() {

    const [nav,setnav] = useState(false);
    
    const changeBackground = () => {
        if(window.scrollY >= 50) {
            setnav(true);
        }
        else {
            setnav(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <nav id="nav" className={nav ? 'nav active' : 'nav'}>
            <a href='#' className='logo'>
                <img src={logo} alt='' />
            </a>
            <input type='checkbox' className='menu-btn' id='menu-btn' />
            <label className='menu-icon' for='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <ul className="menu">
                <li><a href="" className="tabs">Home</a></li>
                <li><a href="#" className="tabs">IDEA</a></li>
                <li><a href="#" className="tabs">How Does it Work?</a></li>                
                <li><a href="#" className="tabs">About Us</a></li>
                <li><a href="#" className="tabs">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
