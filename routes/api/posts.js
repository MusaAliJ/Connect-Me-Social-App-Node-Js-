const express = require('express');
const router = express.Router();

router.get('/test', (req,res)=>res.json({message:'Post Route Is Working'}));



module.exports = router;