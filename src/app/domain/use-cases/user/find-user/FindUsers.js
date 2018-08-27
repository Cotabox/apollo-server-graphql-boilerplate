const dependencies = {
  UsersRepository: require('../../../../infrastructure/repository/UserRepository'),
};

const FindUsers = (data, injection) => {
  const {
    ForbiddenError,
    UsersRepository,
    UserLogged
  } = Object.assign({}, dependencies, injection);
  if (!UserLogged) {
    throw new ForbiddenError('User must logged!')
  }
  return new UsersRepository(injection).findUsers();
};

module.exports = FindUsers;
