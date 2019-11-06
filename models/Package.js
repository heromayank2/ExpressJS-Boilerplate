const mongoose = require("mongoose");

var packageSchema = mongoose.Schema({
    package_id: String,
    package_type: String,
    purchase_id: String,
    facilites_id: String,
    purchase_date: {
        type: String,
        default: Date.now()
    },
    user_id: String,
    price: Number,
    expiry_date: Date
})

module.exports = mongoose.model("Package", packageSchema);