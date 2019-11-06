const mongoose = require("mongoose");

var facilitesSchema = mongoose.Schema({
    user_id: String,
    facilites_id: String,
    package_id: String,
    package_type: String,
    spa: Boolean,
    swimming: Boolean,
    RoomType: String,
    room: String,
    ResturantType: String,
    gym: Boolean,
    casino: Boolean,
    shooting: Boolean,
    golf: Boolean,
    trip: Boolean,
    snooker: Boolean
})

module.exports = mongoose.model("Facility", facilitesSchema)