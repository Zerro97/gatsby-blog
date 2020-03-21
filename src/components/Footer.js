import React, { Component } from 'react'
import github from '../../content/images/github.png'
import linkedin from '../../content/images/linkedin.png'

/*
  <div>
    <a href="https://github.com/zerro97" target="_blank" rel="noopener noreferrer">
      Github
    </a>
  </div>
*/

const Footer = () => {
  return(
    <footer className="footer container">
      <div>
        <p>Created with Gatsby</p>
      </div>
      <div>
        <a href="https://github.com/zerro97" title="GitHub">
          <img
            src={github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-img"
            alt="GitHub"
          />
        </a>
        <a href="https://www.linkedin.com/in/hui-beom-kim-4a0849165/" title="LinkedIn">
          <img
            src={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-img"
            alt="LinkedIn"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer