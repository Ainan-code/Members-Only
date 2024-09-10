var express = require('express');
var router = express.Router();
const message_controller = require('../controllers/messageController')

router.get('/message', message_controller.user_message_get);

router.post('/message', message_controller.user_message_post);

router.get('/homepage', message_controller.message_homepage);

module.exports = router;
