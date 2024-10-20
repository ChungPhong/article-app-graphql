import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }

  type Category {
    id: String
    title: String
    avatar: String
  }

  type Query {
    getListArticle: [Article]
    getArticle(id: ID): Article

    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
  }

  input CategoryInput {
    title: String
    avatar: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article

    createCategory(category: CategoryInput): Category
    updateCategory(id: String, category: CategoryInput): Category
    deleteCategory(id: String): String,
  }
`;
