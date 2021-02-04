const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan());

app.use("/", (req, res) => res.send({ hello: "Muthafuka" }));

app.listen(5000, console.log(`Server running on port 5000`));
