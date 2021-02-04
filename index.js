const express = require("express");
const morgan = require("morgan");
const connectDB = require("./connect");
const event = require("./routes/event");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
connectDB();

app.use("/event", event);

app.listen(5000, console.log(`Server running on port 5000`));
