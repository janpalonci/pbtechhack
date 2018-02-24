const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    picUrl: String,
    type: String,
    description: String,
    company: {
        name: String
    },
    class: {
        name: String
    },
    contact: {
        email: String,
        phone: Number
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;