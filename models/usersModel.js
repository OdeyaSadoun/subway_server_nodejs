const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
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
  num_house: String,
  date_created: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
});

exports.UserModel = mongoose.model("users", userSchema);
