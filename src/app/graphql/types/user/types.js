const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum _UserType {
    GUEST
    CUSTOMER
    SYSADMIN
  }
  """Object Type that represents a User"""
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    type: _UserType!
  }
`;

const resolvers = {
  User: {
    // APPROACH TO TRANSFORM POSSIBLE _id RECEIVED FROM MONGODB DATABASE
    id: root => root._id || root.id,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};


