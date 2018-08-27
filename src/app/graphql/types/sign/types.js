const { gql } = require('apollo-server-express');

const typeDefs = gql`
  """Object Type that represents a Sign data"""
  type Sign {
    token: String!
    user: User
  }
`;

const resolvers = {
  Sign: {
    user: root => root.user,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};


