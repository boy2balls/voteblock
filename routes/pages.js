const express = require('express');
const router = express.Router();

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
router.post('/register',(req,res,next)=>{
    res.json(req.body);
})
module.exports = router;
