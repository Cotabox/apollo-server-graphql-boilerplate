const dependencies = {
  UsersRepository: require('../../../../infrastructure/repository/UserRepository'),
};

const FindUsers = (data, injection) => {
  const {
    UsersRepository,
    UserLogged
  } = Object.assign({}, dependencies, injection);
  if (!UserLogged) {
    throw new Error('User must logged!')
  }
  return new UsersRepository(injection).findUsers();
};

module.exports = FindUsers;
