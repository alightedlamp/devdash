const ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(`User is authorized: ${req.isAuthenticated()}`);
    return next();
  }
  res
    .status(401)
    .render('dashboard', { error: 'Unauthorized! Maybe you should login?' });
};

module.exports = {
  ensureAuthenticated: ensureAuthenticated
};
