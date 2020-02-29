import React, { Component, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import floppy from '../images/floppy.png'
import ThemeContext from '../context/ThemeContext'

const Navigation = ({ menuLinks }) => {
  // Define States
  const [scrolled, setScrolled] = useState(false);

  // ComponentDidMount
  useEffect(() => {
    window.addEventListener('scroll', navOnScroll)
  
    // ComponentWillUnmount
    return () => {
      window.removeEventListener('scroll', navOnScroll)
    }
  }, [])

  navOnScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  return(
    <nav className={scrolled ? 'nav scroll' : 'nav'}>
      <div className="nav-container">

        <div className="brand">
          <Link to="/">
            <img src={floppy} className="favicon" alt="Floppy Diskette" />
            <span className="text">Full Stack Programmer</span>
          </Link>
        </div>

        <div className="links">
          {menuLinks.map(link => (
            <Link key={link.name} to={link.link} activeClassName="active">
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  )
}

export default Navigation;
