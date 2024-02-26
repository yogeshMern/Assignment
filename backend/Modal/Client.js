const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "A client email should be unique"],
    },
    mobilenumber: {
        type: Number,
        required: true,
        unique: [true, "A client mobile number should be unique"],
        minlength: [10, "A client mobile number should be minimum 10 characters"],
        maxlength: [15, "A client mobile number should be maximum 15 characters"]
    },
    project: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Client", clientSchema);


module.exports = mongoose.model("Client", clientSchema);