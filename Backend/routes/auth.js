const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');


const JWT_SECRET = 'Adilisagoodboy';

//ROUTE 1: Create a user using POSY: "/api/auth/createuser" no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
  
  
      // res.json(user)
      res.json({ authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


//ROUTE 2: Authenticate a user using POST: "/api/auth/login" no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // if error then return bad request and errors
    const errors = validationResult(req);
    let success = true
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if (!user) {
            success = false
            return res.status(400).json({success , error: "Please login wit correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success , error: "Please login wit correct credentials" })
        }
       
        const payload = {
            user:{
                id:user.id
            }
        };
        
        const authToken = jwt.sign(payload, JWT_SECRET)

        res.json({success, authToken})

    } catch (error) {
        console.error(success, error.message);
        res.status(500).send("Internal server error occured");
    }

    
})

//ROUTE 3: Get loggedin user details using POSY: "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res) => {
     // if error then return bad request and errors
     let success = true
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({success, errors: errors.array() });
    }
try {
    let userid = req.user.id
    const user = await User.findById(userid).select('-password')
    res.send(success, user)

} catch (error) {
    success = false
    console.error(success, error.message);
    res.status(500).send("Internal server error occured");
}


})

module.exports = router
