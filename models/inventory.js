const mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    name: String,
    bags: {
        type: Array,
        default: []
    },
    userId: String

});

module.exports = mongoose.model('Inventory', inventorySchema);
