let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  dob: Date,
  website: String,
  created_at: Date,
  updated_at: Date
});


userSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at) {
    this.created_at = currentDate;
  }

  next();
})

module.exports = mongoose.model('User', userSchema);