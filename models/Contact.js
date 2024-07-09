const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    nom : {type: String},
    prenom : {type: String},
    email : {type: String},
    message : {type: String}
})

module.exports = mongoose.model('Contact', contactSchema);