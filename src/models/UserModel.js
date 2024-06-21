const mongoose = require('mongoose');
const { commentSchema } = require('./CommentSchema');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    viewHistory: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog"}],
        required: false,
        unique: false
    },
    comments: {
        type: [commentSchema],
        required: false
    }    
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}