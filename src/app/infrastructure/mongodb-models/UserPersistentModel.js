function GenerateUsersMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const userMongoSchema = new Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    password: String,
    type: {
      type: String,
      uppercase: true,
      default: 'GUEST',
      enum: ['CUSTOMER', 'SYSADMIN', 'GUEST'],
    },
    creationDate: { type: Date, default: Date.now },
    updateDate: Date,
    active: { type: Boolean, default: true },
  });
  return connection.model('users', userMongoSchema);
}

module.exports = injection => GenerateUsersMongoSchema(injection);
