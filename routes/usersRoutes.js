var express = require('express');
var router = express.Router();
const passport = require("passport");
const config = require('../config/passportConfig');

// Require controller modules

const user_controller = require("../controllers/userController")

const message_controller = require("../controllers/messageController");

/* GET users listing. */


// get sign up page for user//

router.get('/register', user_controller.user_register_get);

// register the user data in the db//

router.post('/register', user_controller.user_register_post);

router.get('/membership', user_controller.user_membership);
 


router.post('/membership', user_controller.user_membership_post);



module.exports = router;
