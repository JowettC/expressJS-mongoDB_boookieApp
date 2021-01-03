const express = require("express");
const router = express.Router();
const Post = require('../models/Book')
const bp = require('body-parser')
const auth = require("../auth/auth");
require("dotenv").config();
const Book = require("../models/Book");
var dayjs = require('dayjs')
// Database setup
// const db = require("../db");
const dbName = "Boookie";
const collectionName = "books";


router.use(bp.json());


router.get("/", auth.authenticateToken, async (req, res) => {
  // console.log(req.user.name)
    let books = await Book.find({
      username: req.user.name
    })
    res.send({error: false, data:books})
});

router.post("/", auth.authenticateToken, async (req, res) => {
  // console.log(req.body.date)
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    username: req.user.name
  });

    book.save()
    .then( data => {
      // res.send({error:"false", data:data, msg:"created"});
      res.send({error: false, data:data, msg:"Successfully Created"})
    })
    .catch(err =>{
      res.send({error: true, msg:err})
    })
});
router.delete("/:id", auth.authenticateToken, async (req, res) => {
    await Book.deleteOne({_id: req.params.id})
    console.log(req.params.id)
    res.send({error: false, _id:req.params.id, message:"Successfully Deleted"})
});

  module.exports = router;