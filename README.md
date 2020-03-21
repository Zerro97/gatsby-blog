# Gatsby Blog
This is personal portfolio website running on Gatsby and React!

## Content
[Description](#description)<br>
[Gatsby](#description)<br>
[Graphql](#description)<br>
[Folder/File Structure](#description)<br>

## Description
This website is built from [Gatsby Advanced Starter](https://github.com/vagr9k/gatsby-advanced-starter/) and it is heavily inspired by the [blog](https://www.taniarascia.com/) written by tania rascia.

## Gatsby
Gatsby is based on react and uses graphql for querying data. It is used for making static sites and has a **data layer** in which we write our contents for the website. For example, in gatsby we can convert markdown files (the same file type as README.md in github) to actual html page. This is incredibly useful since I don't have to worry about writing a new html file for every blog post I make and keep the contents separated from the rest of the website.<br>

There is a bit of learning curve (at least for me), since it uses graphql. Graphql is query language for API (eg. REST api), released by Facebook in 2015.

## Graphql
Just like REST api, graphql is querying language, meaning it gives developers a way of interacting between client and server. Graphql is different from REST, however, since it is organized in terms of types and fields and not endpoints like REST. For example, in REST we define server routes/endpoints such as `/book/:id` or `/author/:id/book/:id` and uses api calls such as `GET`, `POST`, `PUT` and `DELETE` on the routes to interact with data. In graphql, we have one single endpoint and makes one single root request on that endpoint. After some processing in the server side (eg. getting user data from database), graphql send back the data. It is important to note that when we make a query, we specify which data we want from the server and only gets back exact data that we need. This is different from REST where we might get unnecessary data from our query to an endpoint.<br>

In graphql, the data is structured in terms of graph. Data graph has many nodes with different relationship to other nodes. Each query traverses through this graph and grabs any data that is requested.

## Folder/File Structure
#### Root
* **content:** Folder containing data/content for the blog. It contains markdown files each of which correspond to one post/page. This markdown files are queried by graphql and converted to HTML pages as defined by the templates.
* **data:** Contains siteconfig file which defines the site metadata such as website title and description.
* **src:** Folder containing files that make up the website, such as components, images, layout, styles.
* **static:** 
* **gatsby-config:** This file includes various plug-ins and specify how we are using these plug-ins.
* **gatsby-node:** This is where we create pages from the graphql queries. It parses through graphql queries and make pages according to the templates.

#### Src
* **components:** Building blocks of the website
* **context:** React hook context
* **images:** Images that aren't used in post/page
* **layout:** 
* **netlifycms:**
* **pages:**
* **styles:**
* **templates:**
