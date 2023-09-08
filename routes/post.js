
 var mongoose = require('mongoose');

 const postSchema = mongoose.Schema({
      image:String,
      caption:String,
      likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
      }],
      comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
      }],
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
 })

 module.exports = mongoose.model('post',postSchema);