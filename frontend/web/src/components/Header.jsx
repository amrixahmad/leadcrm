import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Header = () => {
  const [token,setToken] = useContext(UserContext)

  const handleLogout = () => {
    setToken(null)
  }

  return (    
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
  
        <h1 className="logo"><a href="">Lead CRM</a></h1>
        {/* Uncomment below to use image logo */}
        {/* <a href="index.html" className="logo"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}
  
        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="">Home</a></li>
            <li><a className="nav-link scrollto" href="">About</a></li>
            <li><a className="nav-link scrollto" href="">Services</a></li>
            <li><a className="nav-link scrollto o" href="">Portfolio</a></li>            
            {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><a href="#">Drop Down 1</a></li>
                <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                  <ul>
                    <li><a href="#">Deep Drop Down 1</a></li>
                    <li><a href="#">Deep Drop Down 2</a></li>
                    <li><a href="#">Deep Drop Down 3</a></li>
                    <li><a href="#">Deep Drop Down 4</a></li>
                    <li><a href="#">Deep Drop Down 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Drop Down 2</a></li>
                <li><a href="#">Drop Down 3</a></li>
                <li><a href="#">Drop Down 4</a></li>
              </ul>
            </li> 
            <li><a className="nav-link scrollto" href="">Contact</a></li>
            <li><a className="nav-link scrollto" href="">Log In</a></li>
            <li><a className="nav-link scrollto" href="">Log Out</a></li>
            */}            
            <li><a className="getstarted scrollto" href="">Get Started</a></li>
            {token && (<button 
              className='btn btn-warning'
              onClick={handleLogout}
            >Logout</button>)
            }            
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
  
      </div>
    </header>
  )
}

export default Header