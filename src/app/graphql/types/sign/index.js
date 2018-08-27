const { merge} = require('lodash');
const { typeDefs: signObjectTypes } = require('./types');
const { resolvers: signObjectTypesResolvers } = require('./types');
const { typeDefs: signQueries } = require('./queries');
const { resolvers: signQueriesResolvers } = require('./queries');

module.exports = {
  signTypeDefs: [signObjectTypes, signQueries],
  signResolvers: merge({}, signObjectTypesResolvers, signQueriesResolvers),
};
