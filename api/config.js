import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
