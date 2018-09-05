import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import config from './config';
import typeDefs from './schema';
import logger from './logger';

const Query = require('./resolvers/Query');

const cors = {
  origin: config.corsOrigin,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-xsrf-token'],
};

const app = express();
app.use(helmet());

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, cors, path: config.graphqlPath });
app.get('/playground', expressPlayground({ endpoint: config.graphqlPath }));

app.listen({ port: config.port }, () => {
  logger.info(`Server is running on http://localhost:${config.port}`);
  logger.info(`Visit GraphQL playgound on http://localhost:${config.port}/playground`);
});
