const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//
// ─── DB ─────────────────────────────────────────────────────────────────────────
//

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Db connected");
    })

mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
})

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//

// morgan
app.use(morgan('dev'));
// body parser
app.use(bodyParser.json())
// express validator
app.use(expressValidator());

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

const post = require('./nodeapi/routes/post');
const auth = require('./nodeapi/routes/auth');
app.use("/", post);
app.use("/", auth);


app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})