import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import config from '../../data/SiteConfig'

const Index = () => {
  return (
    <Layout>
      <Helmet title={`${config.siteTitle} – Full Stack Software Developer`} />
      <div className="container">
        <div className="lead">
          <div className="elevator">
            <h1>{`Greetings`}</h1>
            <p>
              I'm a full stack software developer creating projects and writing about modern JavaScript, Node.js, and development.
            </p>
          </div>
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
