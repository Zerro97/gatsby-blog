import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";

const TagTemplate = ({ pageContext, data }) => {
  const [tag, setTag] = useState(null);
  const [edges, setEdges] = useState(null);

  useEffect(() => {
    setTag(pageContext.tag);
    setEdges(data.allMarkdownRemark.edges);
  });

  return (
    <Layout>
      <Helmet title={`Posts tagged as "${tag}" – ${config.siteTitle}`} />
      <div className="container">
        <h1>
          Posts tagged as <u>{tag}</u>
        </h1>
    </div>
  </Layout>
  );
}

export default TagTemplate

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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

/*
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            cover
            date
          }
        }
      }
    }
  }
`;
*/