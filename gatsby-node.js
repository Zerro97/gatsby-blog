/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const kebabCase = require('lodash.kebabcase');
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  const postPage = path.resolve("src/templates/post.js");
  const tagPage = path.resolve("src/templates/tag.js");
  const categoryPage = path.resolve("src/templates/category.js");
  const pagePage = path.resolve("src/templates/page.js");
  //const listingPage = path.resolve("./src/templates/listing.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
              categories
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  markdownQueryResult.data.allMarkdownRemark.edges.forEach(edge => {
    // Adding tags in all pages to set
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag)
      })
    }

    // Adding categories in all pages to set
    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach(category => {
        categorySet.add(category)
      })
    }

    // If the page is post type
    if (edge.node.frontmatter.template === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    }

    // If the page is page type
    if (edge.node.frontmatter.template === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: pagePage,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    }
  });

  //  Create page displaying all tags
  const tagList = Array.from(tagSet)
  tagList.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // Create page displaying all categories
  const categoryList = Array.from(categorySet)
  categoryList.forEach(category => {
    createPage({
      path: `/categories/${category.toLowerCase()}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
};
