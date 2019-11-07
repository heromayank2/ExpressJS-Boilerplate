const mongoose = require("mongoose");

var facilitesSchema = mongoose.Schema({
    facilites_id: String,
    package_id: String,
    package_type: String,
    guests: Number,
    rooms: Number,
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
    pool: Boolean
})

module.exports = mongoose.model("Facility", facilitesSchema)