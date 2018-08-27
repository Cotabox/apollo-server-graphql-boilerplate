const internalDependencies = {
  jwt: require('jsonwebtoken'),
  UserRepository: require('../../infrastructure/repository/UserRepository'),
  CreatePassword: require('../../utils/CreatePassword'),
  Logger: require('../../utils/Logger'),
};

class AuthenticateService {
  static async user(data, externalDependencies) {
    const {
      AuthenticationError,
      UserPersistentModel,
      UserRepository,
      Logger,
      jwt,
      CreatePassword,
    } = Object.assign({}, internalDependencies, externalDependencies);

    try {
      const password = CreatePassword.make(data.password);

      const dataFinded = await new UserRepository(externalDependencies)
        .findUserByEmail(data.email, { UserPersistentModel });

      if (!dataFinded) {
        Logger.warn(`User ${data.email} not finded`);
        throw new AuthenticationError('Email or Password incorrect');
      } else if (password === dataFinded.password) {

        const payload = {
          id: dataFinded._id,
          email: dataFinded.email,
          type: dataFinded.type,
          active: dataFinded.active,
        };

        return {
          token: jwt.sign(payload, 'MyAP1@20185b560566a59bf52343d99da7-gr4phql'),
          user: {
            id: dataFinded._id,
            name: dataFinded.name,
            type: dataFinded.type,
            email: dataFinded.email,
          }
        };
      } else {
        throw new AuthenticationError('Email or Password incorrect');
      }
    } catch (e) {
      throw e;
    }
  }

  static userFromToken({ id }, externalDependencies) {
    const {
      UserPersistentModel,
      UserRepository,
    } = Object.assign({}, internalDependencies, externalDependencies);
    return new UserRepository(externalDependencies)
      .findUserById(id, { UserPersistentModel });
  }
}

module.exports = AuthenticateService;


