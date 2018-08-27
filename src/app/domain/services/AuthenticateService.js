const dependencies = {
  jwt: require('jsonwebtoken'),
  UserRepository: require('../../infrastructure/repository/UserRepository'),
  CreatePassword: require('../../utils/CreatePassword'),
  Logger: require('../../utils/Logger'),
};

class AuthenticateService {
  static async user(data, injection) {
    const {
      UserPersistentModel,
      UserRepository,
      Logger,
      jwt,
      CreatePassword,
    } = Object.assign({}, dependencies, injection);

    const password = CreatePassword.make(data.password);

    try {
      const dataFinded = await new UserRepository(injection)
        .findUserByEmail(data.email, { UserPersistentModel });

      if (!dataFinded) {
        Logger.warn(`User ${data.email} not finded`);
        throw new Error('Email or Password incorrect');
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
        throw new Error('Email or Password incorrect');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static userFromToken({ id }, injection) {
    const {
      UserPersistentModel,
      UserRepository,
    } = Object.assign({}, dependencies, injection);
    return new UserRepository(injection)
      .findUserById(id, { UserPersistentModel });
  }
}

module.exports = AuthenticateService;


