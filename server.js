const express = require('express');
const mongoose = require('mongoose');
const app = express();



//Database 
const db = require('./config/keys').mongoURI;

//Mongoose Connection
mongoose.connect(db)
.then(()=>console.log('Database Has Connected'))
.catch(err=>console.log('Database has some problem in connection',err))


app.get('/',(req,res)=>res.send('Hello Alpha!'));



const port = process.env.PORT || 5000;

app.listen(port,()=> console.log('Server Has Started'));