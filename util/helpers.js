const ensureAuthenticated = function(req, res, next) {
<<<<<<< HEAD
  // if (req.isAuthenticated()) {
  return next();
  // }
  // res.status(401).redirect('/');
=======
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized!');
>>>>>>> 0b9658ecd00d324101346699ae917cebd458b2a4
};

module.exports = {
  ensureAuthenticated: ensureAuthenticated
};
