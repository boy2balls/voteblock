const express = require('express');
const nodeFetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "HomePage"
    });
});

router.get('/register', (req, res, next) => {
    res.render('register-form'), {
        title: "Register Page"
    }
});

router.get("/home", (req, res, next) => {
    res.render('home', {});
    let user = req.session.user;
    if (user) {
        res.render('home', {opp: req.session.opp, name: user.email});
        return;
    }
    res.redirect('/');
});

router.post('/login', (request, response) => {
    var username = null;
    console.log(request.body);
    nodeFetch.default('http://127.0.0.1:8080/e-voting/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestId: Date.now().toString(),
            walletId: request.body.email,
            password: request.body.password,
        }),
    })
        .then(res => {
            if (res.ok) {
                username = res.body();
            }
        })
        .catch(err => {
            response.json('err');
        });

    response.render('home');
});

router.post('/register/post', (req, res, next) => {
    let userInput = {
        email: req.body.email,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password,
        type: req.body.type,
        sex: req.body.sex
    };

    user.create(userInput, function (lastId) {
        if (lastId) {
            res.send('welcome ' + userInput.email);
        }
    });
});
module.exports = router;
