const dependencies = {
  UserRepository: require('../../../../infrastructure/repository/UserRepository'),
  CreatePassword: require('../../../../utils/CreatePassword'),
};

const CreateUser = (data, injection) => {
  const {
    UserRepository,
    CreatePassword,
    Logger,
  } = Object.assign({}, dependencies, injection);
  const newUser = Object.assign({}, data);
  try {
    newUser.password = CreatePassword.make(data.password);
  } catch (e) {
    Logger.warn(e.message);
    throw new Error('Error to create User');
  }
  return new UserRepository(injection).createUser(newUser);
};

module.exports = CreateUser;
