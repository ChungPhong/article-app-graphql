import { gql } from "apollo-server-express";

//GraphQL
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;
