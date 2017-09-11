const router = require('express').Router(),
      auth = require('../config/auth'),
      handler = require('../utils/handler');

const User = require('../database/user'),
      Student = require('../database/student');

router.get('/', auth.verifyJWT, (req, res) => {
  User.findById(req.user._id, 'email teams')
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

module.exports = router;
