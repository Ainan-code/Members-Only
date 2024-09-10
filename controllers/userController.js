const User = require("../models/User");

const Message = require("../models/Message");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const connectToMongo = require("../config/database");
const { json } = require("express");

const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;


connectToMongo();






// Display user signup  form on GET.

exports.user_register_get = asyncHandler(async (req, res, next) => {

 

  res.render("register", {
    title: "Register",
  
    
    
  });
});


// Handle user signup form .

exports.user_register_post = [

  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please enter a username'),
  body('password')
    .isLength({ min: 1 }).escape(),
  body('confirm-password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match').escape(),


   

   
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        //hash password inserted by the user
      
        try {
          const user = new User({
            username: req.body.username,
          
           
            password: await bcrypt.hash(req.body.password, 10)
        
          });
         const result = await user.save();
         res.redirect('/');
         console.log(result);
        } catch (err) {
          return next(err);
        };
      } else {
        const  alert = errors.array();
        res.render('register', { alert})
      }
  
  
    })
];
 

 exports.user_membership = [
  asyncHandler(async (req, res, next) => {
    res.render('membership')
  })
 ]



exports.user_membership_post = [
  asyncHandler(async (req, res, next) => {
    const passcode = req.body.member.toLowerCase();
    if (passcode == "rock") {
   const user = await User.findOneAndUpdate(req.user._id, { membership_status: true }, {new: true});
    console.log(user);
      res.render("index", {user: req.user});
    } else {
      res.render("membership", {
        error: "Wrong Pass-Code",
      });
    }
  })
];
  


exports.user_message = [
  asyncHandler(async(req, res, next) => {
    res.render('message_form')
  } )
]


exports.user_message_post = [
  asyncHandler(async(req, res, next) => {
    res.render('message_form')
  } )
]
  
  
