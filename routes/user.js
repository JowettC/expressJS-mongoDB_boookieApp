const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bp = require("body-parser");
// Database setup
const User = require("../models/User");
const db = require("../db");
const { Mongoose } = require("mongoose");
const dbName = "Boookie";
const collectionName = "user";

router.use(express.json());
router.use(bp.json());

router.post("/register", async (req, res) => {
  //   try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;
  const usersign = { name: username };
  const accessToken = jwt.sign(usersign, process.env.ACCESS_TOKEN_SECRET);
  const myuser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  console.log(myuser);
  await myuser.save();
  res.send({ error: false, user: myuser, token: accessToken });
});
mongoose.connect(
    process.env.DB_CONNECTION,
    (req,res)=>{
        console.log("connect to db")
    }
)

module.exports = router;
