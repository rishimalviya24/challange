const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['follow', 'requested', 'following'],
    default: 'follow',
  }
 
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);