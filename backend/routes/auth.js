const express = require('express');
const router = express.Router();
const User = require("../modules/User");

router.post('/', (req, res)=>{
    const user = User(req.body);
    user.save();
    res.json(req.body);
})

module.exports = router;