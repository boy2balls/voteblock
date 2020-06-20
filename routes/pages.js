const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user= new User();

router.get('/',(req,res)=>{
    res.render('index',{
        title: "HomePage"
    });
});

router.get('/register',(req,res,next)=>{
   res.render('register-form'),{
       title: "Register Page"
   }
})

router.get("/home",(req,res,next)=>{
    let user = req.session.user;
    if(user){
        res.render('home',{opp:req.session.opp,name:user.email});
        return;
    }
    res.redirect('/');
});

router.post('/login',(req,res,next)=>{
    //res.json(req.body);
    user.login(req.body.email,req.body.password,function(result){
        if(result){
 
             req.session.user = result;
             req.session.opp=1;
             res.redirect('/home');
             //res.send('Welcomee '+result.email);
        }else{
            res.send('Username or password incorrect');
        }
    })

 
});
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
