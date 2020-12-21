const express = require("express");
const router = express.Router();
const Post = require('../models/Post')
const bp = require('body-parser')

router.use(bp.json());
router.get("/", (req, res) => {
    res.send("1st route");
  });

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    date: Date.now()
  });

    post.save()
    .then( data => {
      // res.send({error:"false", data:data, msg:"created"});
      res.json(data);
    })
    .catch(err =>{
      res.send({error:"true", data:data, msg:"unable to create"})
    })
});

  module.exports = router;