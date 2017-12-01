const router = require('express').Router(),
      auth = require('../config/auth'),
      handler = require('../utils/handler');

const User = require('../database/user'),
      Student = require('../database/student');

router.get('/', auth.verifyJWT, (req, res) => {
  User.findById(req.user._id, 'email teams registrationWhitelist')
  .populate('teams')
  .exec((err, user) => {
    if (err) handler(false, 'Failed to load user.', 503)(req, res);
    else {
      Student.populate(user, 'teams.members', (err, user) => {
        if (err) handler(false, 'Failed to load team members.', 503)(req, res);
        else handler(true, 'Successfully loaded user.', 200, { user })(req, res);
      });
    }
  });
});

router.post('/password', auth.verifyJWT, (req, res) => {
  req.user.checkPassword(req.body.oldPassword, (err, result) => {
    if (result.authenticated) {
      req.user.password = req.body.newPassword;
      req.user.save(err => {
        if (err) handler(false, 'Failed to save password.', 503)(req, res);
        else handler(true, 'Successfully updated password.', 200)(req, res);
      });
    } else handler(false, 'Incorrect password.', 401)(req, res);
  });
});

module.exports = router;
