const express = require("express");
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const mongoose = require("mongoose");
const PORT = 8080;
const { MONGOURI } = require("./keys");
const cors = require("cors");
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to moongooges");
});
mongoose.connection.on("error", (err) => {
  console.log("Error Connecting", err);
});
app.use(cors());

require("./models/user");
require("./models/post");
require("./models/search");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/search"));

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
