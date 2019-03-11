const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// db connection
const db = require("./config/db");
db(process.env.MONGO_URI);

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//

// morgan
app.use(morgan("dev"));
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// express-validator
app.use(expressValidator());
// cookie-parser
app.use(cookieParser());
// express jwt error handling
// ovo mi ne radi
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});
// cors
app.use(cors());

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

const post = require("./post/routes");
const auth = require("./login/routes");
const user = require("./user/routes");
app.use("/", post);
app.use("/", auth);
app.use("/", user);

//
// ─── SERVER CONNECT ─────────────────────────────────────────────────────────────
//

const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Server is up on port ${port}`);
});
