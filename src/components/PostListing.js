import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import { formatDate } from '../utils/global'

const PostListing = ({postEdges, simple}) => {
  const postList = postEdges.map(postEdge => {
    return {
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      thumbnail: postEdge.node.frontmatter.thumbnail,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      categories: postEdge.node.frontmatter.categories,
    }
  })

  return (
    <section className={`posts ${simple ? 'simple' : ''}`}>
      {postList.map(post => {
        let thumbnail
        if (post.thumbnail) {
          thumbnail = post.thumbnail.childImageSharp.fixed
        }

        const popular = post.categories.includes('Popular')
        const date = formatDate(post.date)
        const newest = moment(post.date) > moment().subtract(1, 'months')

        return (
          <Link to={post.path} key={post.title}>
            <div className="each">
              {thumbnail ? <Img fixed={thumbnail} /> : <div />}
              <div className="each-list-item">
                <h2>{post.title}</h2>
                {!simple && <div className="excerpt">{date}</div>}
              </div>
              {newest && (
                <div className="alert">
                  <div className="new">New!</div>
                </div>
              )}
              {popular && !simple && !newest && (
                <div className="alert">
                  <div className="popular">Popular</div>
                </div>
              )}
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export default PostListing;