const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: [true, 'You must have a password.'] },
  admin: { type: Boolean, default: false },
  meta: {
    dob: Date,
    website: String,
    location: { type: String, default: 'US' }
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  created_at: Date,
  updated_at: Date
})

userSchema.methods.getAge = function() {
  if (!this.meta.dob) return undefined
  const today = new Date()
  let age = today.getFullYear() - this.meta.dob.getFullYear()
  const m = today.getMonth() - this.meta.dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < this.meta.dob.getDate())) age--
  return age
}

userSchema.pre('save', function(next) {
  const today = new Date()
  this.updated_at = today

  if (!this.created_at) this.created_at = today

  next()
})

module.exports = mongoose.model('User', userSchema)
