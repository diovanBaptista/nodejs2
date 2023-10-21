const mongoose = require('mongoose')


const Person = mongoose.model('Person', {
  name:String,
  salary:Number,
  approvad:Boolean,
})

module.exports = Person