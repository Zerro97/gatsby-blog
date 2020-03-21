import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";

const CategoryTemplate = ({ pageContext, markdownRemark }) => {
  useEffect(() => {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
  });

  return (
    <Layout>
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
      </div>
    </Layout>
  );
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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

/* eslint no-undef: "off" */
/*
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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