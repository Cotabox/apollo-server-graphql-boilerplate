module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    'no-underscore-dangle': ['error', { 'allow': ['root._id', '_id', '_doc'] }],
    'rest-spread-spacing': ['error', 'always'],
    'no-restricted-syntax': 0,
    'global-require': 0,
    'camelcase': 0,
    'no-param-reassign': 1,
    'no-await-in-loop': 0,
    'linebreak-style': 0
  },
  globals: {}
};
