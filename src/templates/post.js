import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";

const PostTemplate = ({ pageContext, data }) => {
  const [post, setPost] = useState({id: null, html: null});
  const [frontmatter, setFrontmatter] = useState({title: null, slug: null, date: null, categories: null, tags: null, template: null, id: null});
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    // Get html, frontmatter, slug from markdown files and store them as state
    setSlug(pageContext.slug);
    setPost(data.markdownRemark);
    setFrontmatter(data.markdownRemark.frontmatter);

    if (!post.id) {
      post.id = slug;
    }
  });

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${frontmatter.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <div>
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="post-meta">

            </div>
        </div>
      </div>
    </Layout>
  );
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
    }
  }
`

/* eslint no-undef: "off" */
/*
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
*/