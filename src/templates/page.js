import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import config from '../../data/SiteConfig'

const PageTemplate = ({ pageContext, data }) => {
  const [page, setPage] = useState({id: null, html: null});
  const [frontmatter, setFrontmatter] = useState({title: null, slug: null, date: null, categories: null, tags: null, template: null, id: null});
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    console.log(data);
    // Get html, frontmatter, slug from markdown files and store them as state
    setSlug(pageContext.slug);
    setPage(data.markdownRemark);
    setFrontmatter(data.markdownRemark.frontmatter);

    if (!page.id) {
      post.id = slug;
    }
  });

  return(
    <Layout>
      <Helmet>
        <title>{`${frontmatter.title} – ${config.siteTitle}`}</title>
      </Helmet>
      <div className="container">
        <article>
          <header className="page-header">
            <h1>{frontmatter.title}</h1>
          </header>
          <div className="page" dangerouslySetInnerHTML={{ __html: page.html }} />
        </article>
      </div>
    </Layout>
  )
}

export default PageTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`
