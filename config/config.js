const keys = require('./keys');

module.exports = {
  development: {
    username: 'root',
    password: null,
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
    database: 'database_production',
    host: keys.jawsDbHost,
    dialect: 'mysql'
  }
};
