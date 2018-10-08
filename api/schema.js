import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  type Query {
    greeting: String!
  }
`;

export default typeDefs;
