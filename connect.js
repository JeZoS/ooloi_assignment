const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.

const connectDB = () => {
  const pass = "M@Mt@";
  mongoose.connect(
    `mongodb+srv://JeZoS:${pass}@bello.7xfuz.mongodb.net/event?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
};

module.exports = connectDB;
