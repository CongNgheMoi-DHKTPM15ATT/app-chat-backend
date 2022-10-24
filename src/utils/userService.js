const User = require('./../models/User.js');
const Conversation = require('./../models/Conversation.js')
const asyncHandler = require('express-async-handler');

// exports.friendStatus = {
//   friended: 'FRIENDED',
//   pending: 'PENDING',
//   accepting: 'ACCEPTING',
//   block: 'BLOCK'
// }

module.exports = {
  friendStatus: {
    friended: 'FRIENDED',
    pending: 'PENDING',
    accepting: 'ACCEPTING',
    block: 'BLOCK'
  },
  getReceiverInfo: asyncHandler(async (sender_id, receiver) => {
    console.log(receiver)
    if (receiver) {

      const conversation = await Conversation.findOne({ members: { $size: 2 }, 'members.user_id': { $all: [mongoose.Types.ObjectId(sender_id), mongoose.Types.ObjectId(receiver._id)] } }, { members: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver._id) } } });

      const statusBetweenSenderReceiver = await statusSenderRelativeWithReceiver(sender_id, receiver._id);
      console.log(statusBetweenSenderReceiver)
      if (statusBetweenSenderReceiver !== friendStatus.block) {
        return {
          ...new UserResponse(receiver).customWithoutFriends(),
          nick_name: conversation ? conversation.members[0].nick_name : receiver.user_name,
          conversation: conversation ? conversation._id : null,
          status: statusBetweenSenderReceiver ? statusBetweenSenderReceiver : null
        }
      } else {
        return null
      }

    } else {

      return null;
    }

  })
}

exports.addFriend = async function(user_id, receiver_id, status) {
  const user = await User.findById({ '_id': user_id })
  user.friends.push({ 'user_id': receiver_id, 'status': status });
  user.save();
  console.log(user)
  return user;
}

exports.statusSenderRelativeWithReceiver = async function(sender_id, receiver_id) {
  senderRelativeWithReceiver = await User.findById({ _id: sender_id }, { friends: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver_id) } } });
  console.log("start statusSenderRelativeWithReceiver")
  const status = senderRelativeWithReceiver.friends.length !== 0 ? senderRelativeWithReceiver.friends[0].status : null;
  return await status;
}

// async function getReceiverInfo(sender_id, receiver) {
//   console.log(receiver)
//   if (receiver) {

//     const conversation = await Conversation.findOne({ members: { $size: 2 }, 'members.user_id': { $all: [mongoose.Types.ObjectId(sender_id), mongoose.Types.ObjectId(receiver._id)] } }, { members: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver._id) } } });

//     const statusBetweenSenderReceiver = await statusSenderRelativeWithReceiver(sender_id, receiver._id);
//     console.log(statusBetweenSenderReceiver)
//     if (statusBetweenSenderReceiver !== friendStatus.block) {
//       return {
//         ...new UserResponse(receiver).customWithoutFriends(),
//         nick_name: conversation ? conversation.members[0].nick_name : receiver.user_name,
//         conversation: conversation ? conversation._id : null,
//         status: statusBetweenSenderReceiver ? statusBetweenSenderReceiver : null
//       }
//     } else {
//       console.log("haha")
//       return null
//     }

//   } else {

//     return null;
//   }

// }

exports.updateFriend = async function(user_id, receiver_id, status) {
  const user = await User.update({ '_id': mongoose.Types.ObjectId(user_id), 'friends.user_id': receiver_id }, { '$set': { 'friends.$.status': status } });
  console.log(user)
  return user;
}

exports.removeFriend = async function(user_id, receiver_id) {
  const user = await User.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(user_id) }, { '$pull': { 'friends': { 'user_id': receiver_id } } });
  console.log(user)
  return user;
}