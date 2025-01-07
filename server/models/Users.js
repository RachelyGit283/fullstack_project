const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        immutable:true
    },
    // password:{
    //     type:String,
    //     required:true
    //     },
    email:{
    type:String,
    trim:true,
    lowercase:true,
    required:true
    },
    phone:{
        type:String
                },
    address:{
        type:String
        }
    },{
    timestamps:true
    })
    module.exports = mongoose.model('Users', usersSchema)