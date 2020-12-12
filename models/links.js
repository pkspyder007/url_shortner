const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema({
    original_url: {
        type: String,
        required: "Please provide an URL to shorten."
    },
    short_url: {
        type: String,
        required: "Short URL cannot be empty."
    },
    user_id: {
        type: String,
        required: "User Id cannnot be empty."
    },
    total_visits: {
        type: Number,
        default: 0
    }
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;