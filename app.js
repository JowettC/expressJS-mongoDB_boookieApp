const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bp = require('body-parser')
require("dotenv/config");


// import routes
const booksRoute = require('./routes/books')
app.use('/books', booksRoute);
app.use(bp.json());
app.use(express.json());
// app.use(express.urlencoded());

// routes
app.get("/", (req, res) => {
  res.send("1st route");
  console.log(process.env.DB_CONNECTION)
});


// << db setup >>
const db = require("./db");
const dbName = "Boookie";
const collectionName = "books";

// db init
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });

  // << db CRUD routes >>

}, function(err) { // failureCallback
  throw (err);
});

const port = 3000;
app.listen(port, () => {
  console.log("listening on " + port);
});
