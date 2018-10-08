import Koa from 'koa';
import helmet from 'koa-helmet';
import { ApolloServer } from 'apollo-server-koa';
import koaPlayground from 'graphql-playground-middleware-koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
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

const app = new Koa();
const router = new KoaRouter();
app.use(helmet());

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

router.all(
  '/playground',
  koaPlayground({
    endpoint: config.graphqlPath,
  }),
);

app.use(koaBody());
server.applyMiddleware({ app, cors, path: config.graphqlPath });
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: config.port }, () => {
  logger.info(`🚀 Server is running on http://localhost:${config.port}`);
  logger.info(`🚀 Visit GraphQL playgound on http://localhost:${config.port}/playground`);
});
