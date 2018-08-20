const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  fruits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fruit' }]
})

userSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  doc,
  callback
) {
  const self = this
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(doc, (err, result) => {
          return callback(err, result)
        })
  })
}

module.exports = mongoose.model('User', userSchema, 'users')
