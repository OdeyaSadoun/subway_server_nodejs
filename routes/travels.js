const express = require("express");
const router = express.Router();
const { auth, authAdmin } = require("../middleware/auth");
const { TravelModel } = require("../models/travelsModel");
const { travelSchemaValidate } = require("../validations/travelsValidate");

router.get("/", (req, res) => {
  res.json({ msg: "travels work project 3" });
});

router.get("/allTravelsList", authAdmin, async (req, res) => {
  let perPage = Math.min(req.query.perPage, 20) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let data = await TravelModel.find({})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.get("/travelsUserList", auth, async (req, res) => {
  let perPage = Math.min(req.query.perPage, 20) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let data = await TravelModel.find({ user_id: req.tokenData._id })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.get("/single/:idTravel", auth, async (req, res) => {
  let idTravel = req.params.idTravel;
  console.log("idTravel", idTravel);
  try {
    let data = await TravelModel.findOne({ _id: idTravel });
    console.log("data", data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.get("/search", auth, async (req, res) => {
  let searchPrice = req.query.price;
  let searchPaymentType = req.query.payment_type;

  try {
    let data = await TravelModel.find({
      $or: [
        { "ticket.price": { $eq: searchPrice } },
        { "ticket.payment_type": { $eq: searchPaymentType } },
      ],user_id :req.tokenData._id
    });
    console.log("data", data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error occurred", error: err });
  }
});

router.post("/", auth, async (req, res) => {
  let validBody = travelSchemaValidate(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let travel = new TravelModel(req.body);
    travel.user_id = req.tokenData._id;
    await travel.save();
    res.status(201).json(travel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;
