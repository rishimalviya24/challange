
var mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    
     toUser:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user',
     },
     fromUser:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user'
     },
     msg:String,
})

module.exports = mongoose.model('post',postSchema);