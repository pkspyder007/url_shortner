const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserRouter = require("./routes/users");
const LinkRouter = require("./routes/links");

dotenv.config();

// create our express server
const app = express();
app.use(express.json());

app.use(LinkRouter);
app.use(UserRouter);

// connect to DB
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log("Connected to DB 🐱‍💻🐱‍💻🐱‍💻");
    })
    .catch(err => {
        console.error(err.message);
    })

// start our server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port:${PORT}... 🐱‍🏍🐱‍🏍`));