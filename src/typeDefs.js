import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
  }

  type Query {
    hello: String!
    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String!
    body: String!
  }

  type Mutation {
    createPost(post: PostInput): Post!
    deletePost(id: ID): String!
    updatePost(id: ID, title: String, body: String): Post!
  }
`;
