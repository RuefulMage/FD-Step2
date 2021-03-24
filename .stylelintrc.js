module.exports = {
  extends: ['stylelint-config-airbnb',
    'stylelint-config-rational-order'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'max-nesting-depth': 3,
    'string-quotes': ['single']
  }
};
