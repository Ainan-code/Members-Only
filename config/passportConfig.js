const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const express = require('express');

const User = require('../models/User');
// require User from models - need to create models
 passport.use(
  new LocalStrategy(async function verify(username, password, cb)  {
   
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return cb (null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return cb(null, false, { message: 'Incorrect password' });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }),
);

passport.serializeUser(function (user, cb)  {
  cb(null,  { id: user.id, username: user.username });
});

passport.deserializeUser(function (id, cb) {
  try {
    const user =  User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});


const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));



/* POST /logout
 *
 * This route logs the user out.
 */
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


router.get('/', function(req, res, next) {
  
  res.render('index',   { 
   user: req.user} );
});



module.exports = router;