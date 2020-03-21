import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import config from '../../data/SiteConfig'
import image404 from '../../content/images/404.png'

const NotFoundPage = () => {
  return (
    <>
      <Helmet title={`Page not found – ${config.siteTitle}`} />
      <div className="container-404">
        <img src={image404} className="image-404"/>
        <div className="text-center">
          <h1>404</h1>
        </div>
        <p className="text-center">
          Sorry, but the page you are looking for is not found.<br/>
          You can go back to homepage or return to the previous page
        </p>
      </div>
    </>
  )
}

export default NotFoundPage;