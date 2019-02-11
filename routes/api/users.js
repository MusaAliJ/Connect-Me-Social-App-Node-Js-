const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");

//load model
const User = require('../../models/user');

const router = express.Router();

router.get('/test',(req,res)=>res.json({message:"Users Route Is Working"}));

router.post('/register', (req,res)=>{
    User.findOne({ email: req.body.email }).then(user=>{
        const avatar = gravatar.url(req.body.email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        if(user){
            res.status(400).json({message:'Email is already there'})
        }

        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar:avatar,
            });

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err=> console.log(err));
                })
            })

        }

    })
});



router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user=>{
        if(!user){
          return res.status(404).json({message:'sorry, user not found'});
        }

        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                res.json({message:`Welcome ${user.name}`});
            }
            else{
               return res.status(400).json({message:'Wrong Password'});
            }
        })

    })

})
module.exports = router;