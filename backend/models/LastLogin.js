const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lastLoginSchema = new Schema({
    userId: {
        type: String
    },
    lastLoginTime: {
      type: Date
  },
}, {
    collection: 'lastLogins'
})

module.exports = mongoose.model('LastLogin', lastLoginSchema)