const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user= new User();

router.get('/',(req,res)=>{
    res.render('index',{
        title: "HomePage"
    });
})

router.get('/votepage',(req,res,next)=>{
    res.send('this is vote page');
})

router.get('/register',(req,res,next)=>{
   res.render('register-form'),{
       title: "Register Page"
   }
})

router.post('/votepage',(req,res,next)=>{
    res.json(req.body);
})
router.post('/register/post',(req,res,next)=>{
    let userInput ={
        email: req.body.email,
        firstname:req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password,
        type: req.body.type,
        sex: req.body.sex
    };

    user.create(userInput,function(lastId){
        if(lastId){
            res.send('welcome '+ userInput.email);
        }
});
});
module.exports = router;
