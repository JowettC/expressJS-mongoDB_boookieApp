const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bp = require("body-parser");
// Database setup
const User = require("../models/User");

router.use(express.json());
router.use(bp.json());

router.post("/register", async (req, res) => {
  //   try {
  let existinguser = await User.findOne({
    username: req.body.username,
  });
  if (existinguser) {
    return res.send({ error: true, message: "Username Exist" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;
  const usersign = { name: username };
  const accessToken = jwt.sign(usersign, process.env.ACCESS_TOKEN_SECRET);
  const myuser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
//   console.log(myuser);
  await myuser.save();
  res.send({ error: false, user: myuser, token: accessToken });
});
router.post("/login", async (req, res) => {
    let existinguser = await User.findOne({
        username: req.body.username,
      })
    if(!existinguser){
        return res.send({error: true, message: "Username Doesn't Exist "})
    }
    const result = await bcrypt.compare(req.body.password, existinguser.password)
    if (result){
        const usersign = { name: req.body.username };
        const accessToken = jwt.sign(usersign, process.env.ACCESS_TOKEN_SECRET);
        res.send({ error: false, message: "Successfully Login", token:accessToken });
    }
    else{
        res.send({error: true, message: "Incorrect Password "})
    }
    
});

module.exports = router;
