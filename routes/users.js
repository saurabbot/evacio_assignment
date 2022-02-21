const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Bag = require('../models/bag');
const Inventory = require('../models/inventory');


router.get("/", (req,res) => {
    const userId = req.user._id;
    User.find({}, (err, foundUsers) => {
        if(err){
            console.log(err);
        } else {
            res.render("users", {users: foundUsers});
        }
    });
})
module.exports = router;
