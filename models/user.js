const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: "Email is required."
    },
    is_verified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", UserSchema);
 module.exports = User;