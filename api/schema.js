import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    greeting: String!
  }
`;

export default typeDefs;
