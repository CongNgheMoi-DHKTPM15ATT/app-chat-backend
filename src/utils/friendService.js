const User = require('./../models/User')
const mongoose = require('mongoose')

const friendStatus = {
  friended: "FRIENDED",
  pending: "PENDING",
  accepting: "ACCEPTING",
  block: "BLOCK",
  blocked: "BLOCKED"
};

async function statusSenderRelativeWithReceiver(sender_id, receiver_id) {
  senderRelativeWithReceiver = await User.findById({ _id: sender_id }, { friends: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver_id) } } });

  const status = senderRelativeWithReceiver.friends.length !== 0 ? senderRelativeWithReceiver.friends[0].status : null;
  return await status;
}

exports.statusSenderRelativeWithReceiver = statusSenderRelativeWithReceiver;

exports.checkIsBlockOrBlocked = async function checkIsBlockOrBlocked(sender_id, receiver_id) {
  const statusBetweenSenderReceiver = await statusSenderRelativeWithReceiver(sender_id, receiver_id || receiver_id._id);
  if (statusBetweenSenderReceiver) {
    return statusBetweenSenderReceiver !== friendStatus.block && statusBetweenSenderReceiver !== friendStatus.blocked ? false : true
  } else {
    return false
  }
}