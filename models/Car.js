const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    marque : {type: String},
    modele : {type: String},
    description : {type: String}
})

module.exports = mongoose.model('Car', carSchema);