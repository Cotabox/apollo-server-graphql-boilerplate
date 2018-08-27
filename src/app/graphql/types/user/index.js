const { merge} = require('lodash');
const { typeDefs: userObjectTypes } = require('./types');
const { resolvers: userObjectTypesResolvers } = require('./types');
const { typeDefs: userQueries } = require('./queries');
const { resolvers: userQueriesResolvers } = require('./queries');
const { typeDefs: userMutations } = require('./mutations');
const { resolvers: userMutationsResolvers } = require('./mutations');

module.exports = {
  userTypeDefs: [userObjectTypes, userQueries, userMutations],
  userResolvers: merge({}, userObjectTypesResolvers, userQueriesResolvers, userMutationsResolvers),
};
