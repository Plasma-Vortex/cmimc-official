const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  teams: [ { type: Schema.Types.ObjectId, ref: 'Team', required: true } ],
  registrationWhitelist: { type: Boolean, default: false },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  admin: { type: Boolean, default: false }
});

userSchema.methods.checkPassword = function(password, callback) {
  let user = this;
  bcrypt.hash(password, user.salt, (err, hash) => {
    if (err) return callback(err, null);
    else return callback(null, { authenticated: user.password === hash });
  });
};

userSchema.pre('validate', function(next) {
  let user = this;

  /* set created and/or updated */
  const now = new Date();
  if (!user.created) user.created = now;
  user.updated = now;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    user.salt = salt;
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      /* replace cleartext password with hash */
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
