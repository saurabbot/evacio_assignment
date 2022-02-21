const express = require('express');
const router = express.Router();
const Bag = require('../models/bag');
const User = require('../models/user');
const Inventory = require('../models/inventory');

//get all inventories
router.get("/", isLoggedIn,(req,res) => {
    const userId = req.user._id;
    Inventory.find({userId: userId}, (err, allInventories) => {
        if(err){
            console.log(err);
        } else {
            res.render("inventoryPage", {inventories: allInventories});
        }
    });
});

// add inventory
router.post("/addInventory", (req,res) => {
    const userId = req.user._id;
    var newInventory = {
        name: req.body.name,
        userId: userId,
    }
    Inventory.create(newInventory, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/inventory/");
        }
    })
});
//inventory details
router.get("/:id", (req,res) => {
    Inventory.findById(req.params.id, (err,foundInvetory) => {
        if(err){
            console.log(err);
        } else {
            res.render("inventoryDetail", {inventory: foundInvetory});
        }
    })
});

//remove bag from inventory
router.get("/:inventId/bag/:id/remove", (req,res) => {
    const inventoryId = req.params.inventId;
    const bagId = req.params.id
    console.log(bagId);
    console.log(inventoryId);
    Inventory.findById(inventoryId, (err, foundInventory) => {
        if(err){
            console.log(err); 
        } else {
            Bag.findById(bagId, (err, foundBag) => {
                if(err){
                    console.log(err);
                } else {
                    var idx = foundInventory.bags.indexOf(bagId);
                    foundInventory.bags.splice(idx,1);
                    foundInventory.save();
                    res.redirect("/inventory/" + inventoryId);
                }
            });
        }
    })
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
