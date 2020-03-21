import React, { Component, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.png'
import '../styles/main.scss'

const Layout = ({ children }) => {
  // Define States
  // TODO: dark and notFound should be context
  const [dark, setDark] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [themeClass, setThemeClass] = useState('');


  // ComponentDidMount
  useEffect(() => { 
    if (dark && !notFound) {
      themeClass = 'dark'
    } else if (notFound) {
      themeClass = 'not-found'
    }
  })

  return(
    <>
      <Helmet
        bodyAttributes={{
          class: `theme ${themeClass}`,
        }}
      >
        <meta name="description" content={config.siteDescription} />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      
      <Navigation menuLinks={config.menuLinks} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default Layout;