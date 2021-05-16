module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react'],
  env: {
    browser: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 0
  }
};
