const express = require("express");
const router = express.Router();
const Post = require('../models/Post')
const bp = require('body-parser')
// Database setup
const db = require("../db");
const dbName = "Boookie";
const collectionName = "user";


router.use(bp.json());

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  router.get("/", (req, res) => {
      console.log(collectionName)
    dbCollection.find(collectionName).toArray(function(err, result) {
      if (err) throw err;
        res.send(result);
  });
  
  });
  

  // << db CRUD routes >>

}, function(err) { // failureCallback
  throw (err);
});
// router.get("/", (req, res) => {
//     res.send("getting books");
//   });

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