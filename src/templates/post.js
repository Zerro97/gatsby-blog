import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import { formatDate, editOnGithub } from '../utils/global'
import config from "../../data/SiteConfig";

const PostTemplate = ({ pageContext, data }) => {
  const [post, setPost] = useState({id: null, html: null});
  const [frontmatter, setFrontmatter] = useState({title: null, slug: null, date: null, categories: null, tags: null, template: null, id: null});
  const [slug, setSlug] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    // Get html, frontmatter, slug from markdown files and store them as state
    setSlug(pageContext.slug);
    setPost(data.markdownRemark);
    setFrontmatter(data.markdownRemark.frontmatter);
    setDate(formatDate(post.date));

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
        <article className="single container">
          <header className={`single-header no-thumbnail`}>
            <div className="flex">
              <h1>{frontmatter.title}</h1>
              <div className="post-meta">
                <time className="date">{date}</time>
              </div>
            </div>
          </header>

          <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
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