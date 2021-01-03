const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        Default:Date.now
    },
    username:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Books',BookSchema);