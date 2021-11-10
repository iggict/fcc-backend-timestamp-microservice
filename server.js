const express = require("express");
const app = express();

const cors = require("cors");

// Middlewares

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

// Routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:dateString?", (req, res) => {
  const dateString = req.params.dateString || new Date().toString();

  let date = new Date();

  // Check if timestamp
  if (/^\d*$/.test(dateString)) {
    date.setTime(dateString);
  } else {
    date = new Date(dateString);
  }

  // Check if valid date
  if (date.getTime()) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
