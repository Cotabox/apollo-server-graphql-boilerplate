const internalDependencies = {
  // add your internal dependencies here
};

class UserRepository {
  constructor(externalDependencies) {
    this.dependencies = Object.assign({}, externalDependencies, internalDependencies);
  }

  async createUser(params) {
    const { UserPersistentModel, Logger } = this.dependencies;
    try {
      const userCreated = await UserPersistentModel.create(params);
      if (!userCreated) {
        Logger.error('Error on create User');
        throw new Error('Error on create User');
      }
      return userCreated;
    } catch (e) {
      Logger.error(e.message);
      if (e.code === 11000 || e.code === '11000') {
        // USER ALREADY EXISTS,
        throw new Error('User already exists');
      }
      throw e;
    }
  }

  findUsers(
    where = { active: { $eq: true } },
    select = null,
    skip = 0,
    limit = 1000,
    sort = { creationDate: -1 },
  ) {
    const { UserPersistentModel } = this.dependencies;
    return UserPersistentModel
      .find(where)
      .skip(skip)
      .limit(limit)
      .select(select || {})
      .sort(sort)
      .exec();
  }

  findUser(
    where = { active: { $eq: true } },
    select = null,
  ) {
    const { UserPersistentModel } = this.dependencies;
    return UserPersistentModel
      .findOne(where)
      .select(select || {})
      .exec();
  }

  findUserById(
    id,
    select = null,
  ) {
    const { UserPersistentModel } = this.dependencies;
    return UserPersistentModel
      .findById(id)
      .select(select || {})
      .exec();
  }

  findUserByEmail(
    email,
    select = null,
  ) {
    const { UserPersistentModel } = this.dependencies;
    return UserPersistentModel
      .findOne({ email: { $regex: email, $options: '$i' } })
      .select(select || {})
      .exec();
  }
}

module.exports = UserRepository;
