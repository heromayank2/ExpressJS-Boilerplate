const mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
    user_id:String,
    topic:String,
    tags: Array,
    sentiment:String,
    header_image_url:String,
    likes:Array,
    comments:Array,
    shares:Array,
    Views:Array,
    content:String,
})

module.exports = mongoose.model("Article", articleSchema)