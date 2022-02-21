const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    size: String,
    weight: Number,
    color: String,
    status: String,
    userId: String,
    
});


module.exports = mongoose.model('Bag',bagSchema);
