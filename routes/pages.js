const express = require('express');
const nodeFetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "HomePage"
    });
});

router.get('/register', (req, res, next) => {
    res.render('register-form', {
        title: "Register Page"
    });
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
    console.log(request.body);
    nodeFetch.default('https://cnm-voting-blockchain-dev.herokuapp.com/e-voting/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestId: Date.now().toString(),
            walletId: request.body.walletId,
            password: request.body.password,
        }),
    })
        .then(res => res.json())
        .then(json => {
            if (json.resultCode == 0) {
                response.render('home', {name: json.data.lastName});
            } else {
                response.redirect('/');
            }
        })
        .catch(err => {
            response.json('err');
        });
});

router.post('/register/post', (request, response, next) => {
    console.log(request.body);
    nodeFetch.default('https://cnm-voting-blockchain-dev.herokuapp.com/e-voting/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestId: Date.now().toString(),
            email: request.body.email,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            password: request.body.password,
            type: request.body.type,
            sex: request.body.sex
        })
    
    })
        .then(res =>res.json())
        .then(json=>{
            response.render('walletpage',{
                walletId: json.data.walletId,
                walletAddress: json.data.walletAddress,
                walletPrimary: json.data.walletPrimary
            });
        })
});
module.exports = router;
