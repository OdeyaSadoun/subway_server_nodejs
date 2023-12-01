const mongoose = require("mongoose");

let travelSchema = new mongoose.Schema({
  user_id: String,
  train_name: String,
  payment_type: String,
  date_travel: {
    type: Date,
    default: Date.now(),
  },
});

exports.TravelModel = mongoose.model("travels", travelSchema);
