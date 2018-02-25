const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    picUrl: String,
    type: String,
    description: String,
    author: {
        pic: String,
        firstName: String,
        lastName: String,
        id: String,
    },
    hashtags: [String],
    company: {
        name: String
    },
    class: {
        name: String
    },
    contact: {
        email: String,
        phone: Number
    },
},{ timestamps: { createdAt: 'created_at' } }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;