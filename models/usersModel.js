const mongoose = require("mongoose");

let usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    id_card: String,
    phone: String,
    birth_date: Date,
    email: String,
    password: String,
    card_number: String,
    card_number: String,
    card_validity: String,
    cvc: Number,
    country: String,
    city: String,
    street: String,
    num_house: String
});

exports.UsersModel = mongoose.model("users", usersSchema);