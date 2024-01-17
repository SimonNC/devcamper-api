const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamps = require("./models/Bootcamps");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {});

//Read JSON file
const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Import data
const importData = async () => {
  try {
    await Bootcamps.create(bootCamps);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Bootcamps.deleteMany();
    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
