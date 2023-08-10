const express = require('express');
const router = express.Router();
const User = require("../modules/User");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
jwtSecretKey = "IamHari";
let success = false;

try{
//api for Creating user. Login is not required. 
router.post('/createuser',[ 

    body('name', "Enter a valid name").isLength({min:3}),
    body('email', "Enter a valid mail").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min:3}),


], async(req, res)=>{
    // const user = User(req.body);
    // user.save();
    const result = validationResult(req); 
    if (result.isEmpty()) {

      //Check is user already exists.
        let user = await User.findOne({email:req.body.email});
        if(user)
        {
        return res.status(400).json({success, error:"Sorry ! an user already exists with that email. Enter another email and try again."});
        }
       //Adding salt to the password and changing it into hash.//Hashing
        var salt = await bcrypt.genSalt();
        const secret_password = await bcrypt.hash(req.body.password, salt);
        //Create new user
        user = await User.create({
            name:req.body.name,
            password:secret_password,
            email:req.body.email
          })
          const data = {
            user:{
              id:user.id
            }
          }
          success = true;
          const authToken = jwt.sign(data, jwtSecretKey);
         return res.json({"success":success, "authtoken":authToken});
    }
  
    res.send({ errors: result.array() });
})
}
catch(error){
  console.log(error.message);
  res.status(500).send("Internal Server Error Occured");
}

//api for login. No login required
router.post('/login',[ 
  body('email', "Enter a valid mail").isEmail(),
  body('password', "Password cant't be blank.").exists(),
], async(req, res)=>{
  const result = validationResult(req); 
  if (!result.isEmpty()) {

      return res.status(400).json({"success":success, errors:result.array()});
    }

    const {email, password} = req.body;
    try
    {
      let user = await User.findOne({email:email})
      if(!user)
      {
        return res.status(400).json({"success":success, error:"Please try again with correct credentials."});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare)
      {
        return res.status(400).json({"success":success, error:"Please try again with correct credentials."})
      }

      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data, jwtSecretKey);
      success = true;
      res.json({"success":success, "authToken":authToken})
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");}


    
  })

//api for getting user details //login required
  router.post("/getuser", fetchuser, async(req, res)=>{
    try
    {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.json(user)
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");}
      
     
    })


module.exports = router;