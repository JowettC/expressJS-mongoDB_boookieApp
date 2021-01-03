const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors')
require("dotenv/config");
app.use(cors());
// import routes
const booksRoute = require("./routes/books");
const userRoute = require("./routes/user");
app.use("/books", booksRoute);
app.use("/user", userRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
// app.use(express.urlencoded());

// routes
app.get("/", (req, res) => {
  res.send("application started");
});

// << db setup >>
const InitiateMongoServer = require("./db");
InitiateMongoServer();

const port = 3000;
app.listen(port, () => {
  console.log("listening on " + port);
});
