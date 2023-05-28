// const express = require("express");
const mongoose = require("mongoose");
// const authRouter = require("@/authRouter");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const PORT = process.env.MONGO_PORT || 5001;
// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const start = async () => {
  try {
    return mongoose.connect(process.env.MONGO_CONNECT_URL).then((res) => {
      console.log(`Mongodb started`);
      return res;
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = start;
