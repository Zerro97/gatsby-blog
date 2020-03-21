import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import config from '../../data/SiteConfig'

const BlogPage = ({data}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState(data.posts.edges);
    const [posts, setPosts] = useState(data.posts.edges);

    
    useEffect(() => {
        filterPosts();
    }, [searchTerm, categories]);
    

    const filterPosts = () => {
        // Find posts that include search term as its title
        let filteredPosts = posts.filter(post =>
            post.node.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

        // Find posts that include selected categories
        if (categories.length > 0) {
            filteredPosts = filteredPosts.filter( post =>
                post.node.frontmatter.categories &&
                categories.every(cat => post.node.frontmatter.categories.includes(cat))
            )
        }

        setFilteredPosts(filteredPosts);
    }

    const updateCategories = category => {
        // If clicked category isn't set to state
        if (!categories.includes(category)) {
            // Set that category
            setCategories([...categories, category]);
        } 

        // If clicked category is already set to state
        else {
            // Remove that category
            setCategories(categories.filter(cat => category !== cat));
        }
    }

    return (
      <Layout>
        <Helmet title={`Articles – ${config.siteTitle}`} />
        <div className="container">
          <h1>Articles</h1>

          <div className="category-container">
            {categories.map(category => {
              const active = categories.includes(category.fieldValue)

              return (
                <div
                  className={`category-filter ${active ? 'active' : ''}`}
                  key={category.fieldValue}
                  onClick={async () => {
                    await updateCategories(category.fieldValue);
                  }}
                >
                  {category.fieldValue}
                </div>
              )
            })}
          </div>

          <div className="search-container">
            <input
              className="search"
              type="text"
              name="searchTerm"
              value={searchTerm}
              placeholder="Type here to filter posts..."
              onChange={async e => {
                await setSearchTerm(e.target.value);
              }}
            />
            <div className="filter-count">{filteredPosts.length}</div>
          </div>
          <PostListing postEdges={filteredPosts} />
        </div>
      </Layout>
    )
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 180)
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
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
