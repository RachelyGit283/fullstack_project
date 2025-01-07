const mongoose = require('mongoose')
const postsSchema = new mongoose.Schema({
    title:{
    type:String,
    required:true,
    },
    body:{
        type:String,
        required:false,
    }
    },{
    timestamps:true
    })
    module.exports = mongoose.model('Posts', postsSchema)