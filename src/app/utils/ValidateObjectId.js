// FOR VALIDATE MONGODB IDs
const ValidateObjectId = {
  isValid(id) {
    const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForHexRegExp.test(id);
  },
};

module.exports = ValidateObjectId;
