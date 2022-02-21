const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


//troubleshoot
router.get("/",isLoggedIn, (req,res) => {
    res.send('helllo');
})
//get register form
router.get("/register", (req, res) => {
    res.render('register');
})
// Register
router.post('/register', (req,res) => {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,

    });
    User.register(newUser, req.body.password, function(err, user)
    {
        if(err)
        {   console.log(err);
            return res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req, res, function()
            {
                res.redirect("/login");
            });
        }
    });
});
//login page get
router.get("/login", (req,res) => {
    res.render('login');
});

//handling login logic
router.post("/login", passport.authenticate("local",
	{
	successRedirect: "/bag/",
	failureRedirect: "/login",
	}), function(req, res){
});


router.get("/logout", function(req, res)
{
    req.logout();
    res.redirect("/login");
});   
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}
module.exports = router;