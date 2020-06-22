const express = require("express");
const app = express();
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: 'Login',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use('/', pageRouter);

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
module.exports = app;