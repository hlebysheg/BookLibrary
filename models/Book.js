const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    //books characteristic
    name: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    //Frontend
    photo: {type: String, required: false},
    bookRef: {type: String, required: false},
    //analysis
    clicks: {type: Number,  default: 0},
    //genre
    genre: [{type: String, required: true}]
})

module.exports = model('Books', schema)