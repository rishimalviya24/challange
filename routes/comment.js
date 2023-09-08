
 
   var mongoose = require('mongoose');

  const commentSchema = mongoose.Schema({
    comment:String,
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:''
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    postId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
  })

  module.exports = mongoose.model('comment',commentSchema);