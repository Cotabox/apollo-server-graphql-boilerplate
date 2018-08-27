// EXPRESS
const express = require('express');
// GRAPHQL SERVER
const { ApolloServer } = require('apollo-server-express');
// GRAPHQL SCHEMA
const schema = require('./graphql/schema');
// MIDDLEWARES
const helmet = require('helmet');
const compression = require('compression');
// ANOTHER DEPENDECIES
const Logger = require('./utils/Logger');
const mongo = require('./infrastructure/mongodb-models/index')();
const TokenService = require('./domain/services/TokenService');

const app = express();
const PORT = process.env.PORT || 3000;

// APPLY MIDDLEWARES
app.use(helmet());
app.use(compression());
// If authorization header is present, grab user from mongo and put into the request
app.use((req, res, next) => {
  if (req.headers.authorization) {
    TokenService.findTokenData(req, { mongo }, (error, data) => {
      if (error) {
        res.json({
          data: {
            validateToken: null,
          },
          errors: [
            {
              message: error.message,
              locations: [
                {
                  line: 2,
                  column: 3,
                },
              ],
              path: ['validateToken'],
            },
          ],
        });
      }
      if (data) {
        req.UserLogged = data;
        next();
      } else {
        req.UserLogged = null;
        next();
      }
    });
  } else {
    req.UserLogged = null;
    next();
  }
});

// GRAPHQL START
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    db: mongo,
    Logger,
  }),
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    origin: '*',
    methods: 'GET, POST, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

app.listen(
  {
    port: PORT,
  },
  () => {
    Logger.info(`Apollo GraphQL Server Express running on port ${PORT}`);
  },
);
