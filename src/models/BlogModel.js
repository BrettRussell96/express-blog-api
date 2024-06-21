/*
- Title
- Content
- User (posted by)
- Created date
- Like
- Image upload
- Category
- Audit history
    - user
    - timestamp
*/

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        required: true 
    },
    likes: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}], 
        required: false
    },
    headerImage: {
        type: String, // URL to the file/image storage provider
        required: false
    },
    tags: { // Keywords defined by the blog post author
        type: [String],
        required: true
    },
    categories: { // post category defined by website admin/developer
        type: [String],
        enum: ["life", "travel", "photography", "coding"],
        required: true
    },
    editHistory: {
        type: [{user: String, timestamp: Date}],
        required: false
    }
},
{
    timestamps: true
});


const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
    BlogModel
}