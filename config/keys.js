module.exports = {
  github: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  },
  sessionSecret: process.env.SESSION_SECRET,
  jawsDbUser: process.env.JAWS_DB_USER,
  jawsDbName: process.env.JAWS_DB,
  jawsDbPassword: process.env.JAWS_DB_PASSWORD,
  jawsDbHost: process.env.JAWS_DB_HOST
};
