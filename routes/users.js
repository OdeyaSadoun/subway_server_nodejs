const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.json({msg: "users project 3"});
});

module.exports = router;