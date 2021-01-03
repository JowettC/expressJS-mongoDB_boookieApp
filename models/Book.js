const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Books',BookSchema);