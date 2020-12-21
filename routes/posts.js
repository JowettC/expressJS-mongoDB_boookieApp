const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("1st route");
  });

  module.exports = router;