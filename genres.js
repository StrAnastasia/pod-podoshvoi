const {Schema, model} = require('mongoose')

const genreSchema = new Schema({
  genre: {type: String, unique: true}
})
const Genre = model('Genre', genreSchema)

module.exports = Genre
