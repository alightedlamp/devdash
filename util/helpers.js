const ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .render('dashboard', { error: 'Unauthorized! Maybe you should login?' });
};

module.exports = {
  ensureAuthenticated: ensureAuthenticated
};
