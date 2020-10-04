const mongoose = require('mongoose');
const UserScehema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User - mongoose.model('User', UserScehema);
module.exports = User;