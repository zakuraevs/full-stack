const mongoose = require('mongoose')

const schema = new mongoose.Schema({
/*
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
*/

name: {
  type: String,
  required: true,
  unique: true,
  minlength: 3
},
born: {
  type: Number
}
})

module.exports = mongoose.model('Author', schema)