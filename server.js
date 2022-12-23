const express = require("express");
const cors = require("cors");
const countries = require("./app/controllers/app.controller");

// Server routes
const countriesRoutes = require("./app/routes/countries.routes");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My App" });
});

//////countries////////
app.use("/countries", countriesRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
