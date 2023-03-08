const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientDetailSchema = new Schema({
    clientId: {
        type: String
    },
    firstName: {
      type: String
    },
    lastName: {
        type: String
    },
    companyName: {
      type: String
    },
    position: {
      type: String
    },
    city: {
      type: String
    },
    description: {
      type: String
    },
    profileImg: {
      type: String
    }
}, {
    collection: 'clientDetails'
})

module.exports = mongoose.model('ClientDetail', clientDetailSchema)