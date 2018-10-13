const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const { tshirts } = require('../constants');

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  tshirt: { type: String, enum: Object.keys(tshirts), required: true},
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

studentSchema.pre('validate', function(next) {
  let student = this;

  /* set created and/or updated */
  const now = new Date();
  if (!student.created) student.created = now;
  student.updated = now;

  next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
