const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    member1: { type: String, required: true },
    member2: { type: String, required: true },
    member3: { type: String },
    member4: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: "Invalid email address",
        },
    },
    timestamp: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
