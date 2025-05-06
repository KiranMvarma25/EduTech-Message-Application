const express = require('express');
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dbConnect = require('./config/db');

require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();

app.use(express.json());
app.use(cookieParser());

const cors = require('cors');

const allowedOrigins = [process.env.RENDER_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } 
    else{
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin : "*",
//     credentials: true
// }))

if(!process.env.SESSION_SECRET){
    console.error("SESSION_SECRET is missing in .env file!");
    process.exit(1); 
}


app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the OAuth App</h1><p><a href='/auth/google'>Login with Google</a></p>");
});

app.get("/auth/google",
    passport.authenticate("google", { 
        scope: ["profile", "email"],
        prompt: "select_account"
    })
);


app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

app.get("/dashboard", (req, res) => {
    if (!req.user) return res.redirect("/");
    res.send(`<h1>Welcome, ${req.user.name}</h1><p><a href="/logout">Logout</a></p>`);
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
});

const usersRouter = require('./routes/usersRoute');
app.use('/base', usersRouter);

const messageRouter = require('./routes/messageRoute');
app.use('/message', messageRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});