const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  tgID: String,
  mybands: {type: Array, unique: true, default: []},
  achievements: Object,
  mygigs: {type: Array, unique: true, default: [0]},
})
const User = model('User', userSchema)

module.exports = User
