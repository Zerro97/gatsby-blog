import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import config from '../../data/SiteConfig'
import profile from '../images/profile-photo2.jpg'

const Index = () => {
  return (
    <Layout>
      <Helmet title={`${config.siteTitle} – Full Stack Software Developer`} />
      <div className="container">
        <div className="lead">
          <div className="elevator">
            <h1>{`Greetings`}</h1>
            <p>
              My name is Huibeom Kim and I am a full stack software developer in the making. I create open source projects and write about programming in general.
            </p>
          </div>
          <img src={profile} className="profile-image"/>
        </div>
      </div>
    </Layout>
  )
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 7
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            date
            template
          }
        }
      }
    }
  }
`
