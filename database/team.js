const bcrypt = require('bcrypt'),
      _ = require('lodash'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const teamSchema = new Schema({
  team_name: { type: String, required: true },
  chaperone_name: { type: String, required: true },
  chaperone_email: { type: String, required: true },
  chaperone_number: { type: String, required: true },
  paid: { type: Boolean, required: true, default: false },
  members: [ { type: Schema.Types.ObjectId, ref: 'Student', required: true } ],
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

teamSchema.pre('validate', function(next) {
  let team = this;

  /* set created and/or updated */
  const now = new Date();
  if (!team.created) team.created = now;
  team.updated = now;

  next();
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
