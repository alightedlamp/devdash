const keys = require('./keys');

module.exports = {
  development: {
    username: 'root',
    password: keys.localDbPassword,
    database: 'devdash_db',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'devdash_db',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: keys.jawsDbUser,
    password: keys.jawsDbPassword,
    database: keys.jawsDbName,
    host: keys.jawsDbHost,
    dialect: 'mysql'
  }
};
