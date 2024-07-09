const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
    sujet : {type: String},
    auteur : {type: String},
    description : {type: String},
    message : {type: String}
})

module.exports = mongoose.model('Blog_post', blogPostSchema);