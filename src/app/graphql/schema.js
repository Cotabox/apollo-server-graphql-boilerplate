const { merge, flatten } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');

const { userTypeDefs, userResolvers } = require('./types/user/');
const { signTypeDefs, signResolvers } = require('./types/sign/');

// DEFAULT EMPTY ROOT TYPES
const RootTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const rootTypeDefs = [RootTypes];

const typeDefs = flatten([rootTypeDefs, userTypeDefs, signTypeDefs]);
const resolvers = merge({}, userResolvers, signResolvers);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
