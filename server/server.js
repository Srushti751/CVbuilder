const express = require('express')
// const morgan = require('morgan')
const connectDB = require('./config/config.js')
const dotenv = require("dotenv");
// const cookieSession = require("cookie-session");
// const passportSetup = require("./passport");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
const cors = require('cors')

//config dotenv
dotenv.config();

//connect database
connectDB();

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use('/images', express.static('images'));
// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

// app.use(passport.initialize());
// app.use(passport.session());



//route
app.get("/", (req, res) => {
  res.send("welcome")
})

app.use("/api/users",require('./routes/userRoutes'))
app.use("/api",require('./routes/resumeRoutes'))










app.listen(process.env.PORT, () => {
  console.log("Working on http://localhost:5000")
})