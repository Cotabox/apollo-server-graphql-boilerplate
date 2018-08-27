const jwt = require('jsonwebtoken');
const Authenticate = require('./AuthenticateService');

class TokenService {
  static findTokenData(req, injection, callback) {
    const { mongo: { UserPersistentModel } } = injection;
    const Authorization = req.get('Authorization');
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      let dados;
      try {
        dados = jwt.verify(token, 'MyAP1@20185b560566a59bf52343d99da7-gr4phql');
      } catch (e) {
        return callback(e, null);
      }
      // Validate data from token in Database
      return Authenticate.userFromToken(dados, { UserPersistentModel })
        .then((dataFinded) => {
          if (dataFinded) {
            return callback(null, dados);
          }
          return callback(null, null);
        }).catch(e => callback(e, null));
    }
    return callback({ message: 'Please inform Header Authorization' }, null);
  }
}

module.exports = TokenService;
