import React, { Component } from 'react'
import github from '../../content/images/github.png'

const Footer = () => {
  return(
    <footer className="footer container">
      <div>
        <a href="https://github.com/zerro97" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>

      <div>
        <a href="https://github.com/zerro97" title="Open-source on GitHub">
          <img
            src={github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-img"
            alt="GitHub"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer