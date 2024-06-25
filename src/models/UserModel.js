const mongoose = require('mongoose');
const { commentSchema } = require('./CommentSchema');
const bcrypt = require("bcryptjs");

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
    password: {
        type: String,
        required: true,
        unique: false
    }

    // comments: {
    // These are NOT the same comments as what the blog contain, they just reuse the comment schema
    //     type: [commentSchema],
    //     required: false
    // }    
});

userSchema.pre(
    "save",
    async function (next) {
        const user = this;
        console.log("Pre-save middleware running.");

        if (!user.isModified("password")){
            return next();
        }

        console.log("Pre-save middleware running and password is modified.");
        // If we reach this line of code, the password is modified
        // and thus is not encrypted!
        // we must encrypt it!

        console.log("Raw password is: " + this.password);

        const hash = await bcrypt.hash(this.password, 10);

        console.log("Hashed, encrypted and salted password is: " + hash);

        this.password = hash;

        next();
    }
)

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}