const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// import routes
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute);

// routes
app.get("/", (req, res) => {
  res.send("1st route");
});


//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to DB")
);

const port = 3000;
app.listen(port, () => {
  console.log("listening on " + port);
});
