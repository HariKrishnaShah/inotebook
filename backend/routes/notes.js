const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        name:"Hari",
        NickName:"The Boss"
    }
    res.json(obj);
})

module.exports = router;