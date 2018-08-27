const { gql } = require('apollo-server-express');
const Authenticate = require('../../../domain/services/AuthenticateService');

const typeDefs = gql`
  extend type Query {
  """Query to authenticate User on Application"""
    authenticate(email: String!, password: String!): Sign
  }  
`;

const resolvers = {
  Query: {
    authenticate:  (
      root,
      data,
      {
        db: { UserPersistentModel },
      },
    ) => Authenticate.user(data, { UserPersistentModel }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
