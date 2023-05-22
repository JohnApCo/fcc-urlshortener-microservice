require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const connectDatabase = require("./config/database");

// Basic Configuration
const { PORT } = require("./config/index");
//const port = process.env.PORT || 3000;

app.use(cors());

//connect database
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("./public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//API routes
const shortURL = require("./routes/shortURL.route");
app.use("/api/shorturl", shortURL);
// Not found
app.use(function(req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts("html")) {
    res.sendFile(path.resolve("views/404.html"));
    return;
  }
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }
  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
