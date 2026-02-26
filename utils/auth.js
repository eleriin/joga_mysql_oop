const requireLogin = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect('/users/login');
  }
  next();
}

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session?.user) {
      return res.redirect('/users/login');
    }
    if (!roles.includes(req.session.user.role)) {
      return res.redirect('/');
    }
    next();
  };
}

module.exports = { requireLogin, requireRole };