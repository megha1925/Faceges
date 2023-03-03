require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./src/dbConfig/db");

const app = express();
//cors
const corsOptions = require("./src/utils/corsOptions");

//helmet for security
const helmet = require("helmet");
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use("/public", express.static(path.join(__dirname + "/public")));

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//connecting databse
connectDB();

//to get data in req.body
app.use(express.json({ extended: false, limit: "50mb" }));

app.get("/", (req, res) => {
  //res.send("API WORKING");
  return res.status(401).json({ msg: "Not Authorized" });
});

//routes
app.use("/api/users", require("./src/routes/api/users"));
app.use("/api/auth", require("./src/routes/api/authentication"));
app.use("/api/confirmation", require("./src/routes/api/confirmation"));
app.use("/api/payment", require("./src/routes/api/payment"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
