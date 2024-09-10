const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_message_get = [
    asyncHandler(async(req, res, next) => {
      res.render('message_form')
    } )
  ]
  
  
  exports.user_message_post = [
   
  body('title')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage('Please enter a title'),
body('content')
  .isLength({ min: 1 }).escape(),



 

 
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
     
    
      try {
        const message = new Message({
          title: req.body.title,
        
         
         content: req.body.content
      
        });
       const result = await message.save();
       
       res.redirect('/');
       console.log(result);
      } catch (err) {
        return next(err);
      };
    } else {
      const  alert = errors.array();
      res.render('message_form', { alert})
    }


  })
  ]
    


  
  exports.message_homepage = [
    asyncHandler(async(req, res, next) => {
      await  Message.find().then((data  => {
           res.render('homepage', {data : data})
        }))

    })
    
  ]