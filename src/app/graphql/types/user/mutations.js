const { gql, UserInputError } = require('apollo-server-express');
const CreateUser = require('../../../domain/use-cases/user/create-user/CreateUser');

const typeDefs = gql`
  extend type Mutation {
  """Mutation to create a User"""
    addUser(
      name: String!
      email: String!
      password: String!
      phone: String
    ): User
  }
`;

const resolvers = {
  Mutation: {
    addUser:  (
      root,
      data,
      {
        db: { UserPersistentModel },
        Logger,
      },
    ) => {
      if (data.name === '' || data.email === '') {
        throw new UserInputError('Arguments invalid', {
          invalidArgs: data.name === '' ? ['name'] : ['email'],
        });
      }
      return CreateUser(data, { UserPersistentModel, Logger });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
