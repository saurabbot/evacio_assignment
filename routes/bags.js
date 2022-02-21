const express = require('express');
const router = express.Router();
const Bag = require('../models/bag');
const User = require('../models/user');
const Inventory = require('../models/inventory');
const damagedBags = [];
const repairedBags = [];
const readyBags = [];

//show all bags of the user
router.get("/",isLoggedIn, (req,res) => {

    const userId = req.user._id;
    Bag.find({userId: userId}, (err, allBags) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("landing", {bags: allBags});
        }
    })
});
//add bag
router.post("/addbag", (req,res) => {
    const userId = req.user._id;
    var newBag = {
        size: req.body.size,
        weight: req.body.weight,
        color: req.body.color,
        status: req.body.status,
        userId: userId,

    }
    Bag.create(newBag, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/bag/");
        }
    });
})
//all bags route
router.get("/allbags",isLoggedIn, (req,res) => {
    const userId = req.user._id;
    Bag.find({userId: userId}, (err,allBags) => {
        if(err){
            console.log(err); 
        } else {
            Inventory.find({userId: userId}, (err, allInventories) => {
                if(err){
                    console.log(err);
                } else {
                    res.render("allBags", {bags: allBags, inventories: allInventories});
                }
            })

        }
    });
});
//search bag with uuid
router.post("/searchBag", (req,res) => {
    var query = req.body.query;
    const userId = req.user._id;
    Bag.find({_id: query}, (err, foundBag) => {
        if(err){
            console.log(err);
        } else {
            Inventory.find({userId: userId}, (err, allInventories) => {
                if(err){
                    console.log(err);
                } else {
                    res.render("allBags", {bags: foundBag, inventories: allInventories});
                }
            })
        }
    });

});
//push bag to inventory 
router.post("/:id/pushbag", (req,res) => {
    const bagId = req.params.id;
    console.log(bagId);
    const inventoryId = req.body.inventId;
    Inventory.findById(inventoryId, (err, foundInvetory) => {
        if(err){
            console.log(err);
        } else {
            Bag.findById(bagId, (err,foundBag) => {
                if(err){
                    console.log(err); 
                } else {
                    foundInvetory.bags.push(foundBag);
                    foundInvetory.save();
                    res.redirect("/bag/allbags");
                }
            });
        }
    })
});
//remove bag
router.get("/:id/remove", (req,res) => {
    const bagId = req.params.id;
    Bag.findByIdAndRemove(bagId, (err, removedBag) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/bag/allbags");
        }
    });
});
//change bag status
router.post("/:id/update/:inventId", (req,res) => {
    const bagId = req.params.id;
    const inventId = req.params.inventId;
    console.log(bagId);
    console.log(inventId);
    Inventory.findById(inventId, (err, foundInventory) => {
        if(err){
            console.log(err);
        } else {
            Bag.findById(bagId, (err, foundBag) => {
                var newBag = {
                    _id: foundBag._id,
                    weight: foundBag.weight,
                    size: foundBag.size,
                    color: foundBag.color,
                    status: req.body.status,
                    userId: foundBag.userId,
                }
                var idx = foundInventory.bags.indexOf(bagId);
                foundInventory.bags.splice(idx,1);
                foundInventory.bags.push(newBag);
                foundInventory.save();
                res.redirect("/inventory/"+ inventId);
            });
        }
    }) 
});

function updateBag(bag) {
    Bag.findByIdAndUpdate(bag._id, bag, (err, updatedBag) => {
        if(err){
            console.log(err);
        } else {
            console.log("Bag updated");
        }
    });
}
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}
module.exports = router;