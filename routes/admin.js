const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hello for admin");
});

router.get('/edit',(req,res)=>{
    res.send("Hello for admin edits!");
});

module.exports = router;