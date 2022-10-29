const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');
const Conversation = require('./../models/Conversation.js')
const UserResponse = require('./../responses/userResponse');
const mongoose = require('mongoose')
const BaseRepository = require('./../repositories/BaseRepository')

const friendStatus = {
  friended: "FRIENDED",
  pending: "PENDING",
  accepting: "ACCEPTING",
  block: "BLOCK",
};

async function addFriend(user_id, receiver_id, status) {
  const user = await User.findById({ _id: user_id });
  user.friends.push({ user_id: receiver_id, status: status });
  user.save();
  console.log(user);
  return user;
}

async function statusSenderRelativeWithReceiver(sender_id, receiver_id) {
  senderRelativeWithReceiver = await User.findById({ _id: sender_id }, { friends: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver_id) } } });

  const status = senderRelativeWithReceiver.friends.length !== 0 ? senderRelativeWithReceiver.friends[0].status : null;
  return await status;
}

async function getReceiverInfo(sender_id, receiver) {

  if (receiver) {
    const conversation = await Conversation.findOne({ members: { $size: 2 }, 'members.user_id': { $all: [mongoose.Types.ObjectId(sender_id), mongoose.Types.ObjectId(receiver._id)] } }, { members: { $elemMatch: { user_id: mongoose.Types.ObjectId(receiver._id) } } })

    const statusBetweenSenderReceiver = await statusSenderRelativeWithReceiver(sender_id, receiver._id);
    if (statusBetweenSenderReceiver !== friendStatus.block) {
      // console.log("check status" + statusBetweenSenderReceiver)
      return {
        ...new UserResponse(receiver).customWithoutFriends(),
        nick_name: conversation ? conversation.members[0].nick_name : receiver.user_name,
        conversation: conversation ? conversation._id : null,
        status: statusBetweenSenderReceiver ? statusBetweenSenderReceiver : null
      }
    } else {
      console.log("haha")
      return null
    }
  } else {

    return null;
  }
}

async function updateFriend(user_id, receiver_id, status) {
  const user = await User.update({ _id: mongoose.Types.ObjectId(user_id), "friends.user_id": receiver_id }, { $set: { "friends.$.status": status } });
  console.log(user);
  return user;
}

async function removeFriend(user_id, receiver_id) {
  // const user = await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user_id) }, { $pull: { friends: { user_id: receiver_id } } });
  Conversation.find({ 'members.user_id': { $all: [user_id, receiver_id] } })
  console.log(user);
  return user;
}

const mondel = "User"

const baseRepository = new BaseRepository(mondel)

const userRepository = {
  getAll: asyncHandler(async (req, res) => { await baseRepository.getAll(req, res) }),
  findById: asyncHandler(async (req, res) => { await baseRepository.findById(req, res) }),
  update: asyncHandler(async (req, res) => { await baseRepository.update(req, res) }),
}

const userController = {
  ...userRepository,
  searchUser: asyncHandler(async (req, res) => {
    const { user_id, filter } = req.body;
    const phoneValid = /^0+\d{9}$/;
    const users = [];

    if (filter !== "") {

      const user_receiver_document = filter.match(phoneValid) ? await User.findOne({ phone: filter }) : await User.find({ _id: { $ne: mongoose.Types.ObjectId(user_id) }, user_name: { $regex: '.*' + filter + '.*' } });
      if (!user_receiver_document.length) {
        console.log(user_receiver_document)
        if (user_receiver_document._id) {
          users.push(await getReceiverInfo(user_id, user_receiver_document))

        } else {
          return res.json(users);
        }
      } else {
        for (var i = 0; i < user_receiver_document.length; i++) {
          userInfo = await getReceiverInfo(user_id, user_receiver_document[i])
          console.log(userInfo)
          if (userInfo != null) {

            users.push(userInfo);
          }
        }
      }
      return res.json(users);
    }
  }),
  getFriendsPending: asyncHandler(async (req, res) => {
    const { user_id, status } = req.body;
    const users = [];

    const user_document = await User.aggregate([{
        $match: {
          _id: mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $project: {
          friends: {
            $filter: {
              input: "$friends",
              as: "friend",
              cond: { $eq: ["$$friend.status", status.toUpperCase()] },
            },
          },
        },
      },
    ]);
    user_documents = await User.populate(user_document[0].friends, {
      path: "user_id",
    });

    user_documents.forEach((user) => {
      users.push({
        ...new UserResponse(user.user_id).custom(),
        status: user.status,
      });
    });

    res.json(users);
  }),
  sendFriendRequest: asyncHandler(async (req, res) => {
    const { user_id, receiver_id } = req.body;

    const user_document = await User.findOne({
      _id: mongoose.Types.ObjectId(user_id),
      "friends.user_id": receiver_id,
    });
    console.log(user_document);

    if (user_document === null) {
      const user = await addFriend(user_id, receiver_id, friendStatus.pending);
      await addFriend(receiver_id, user_id, friendStatus.accepting);

      return res.status(200).json({ user: new UserResponse(user).custom() });
    } else {
      return res.send("already send request friend");
    }
  }),
  cancelRequestPending: asyncHandler(async (req, res) => {
    const { user_id, receiver_id } = req.body;
    const statusBetweenSenderReceiver = await statusSenderRelativeWithReceiver(user_id, receiver_id);

    if (statusBetweenSenderReceiver === friendStatus.pending) {
      const user = removeFriend(user_id, receiver_id)
      return res.json({ msg: "Cancel request pending success" })
    } else {
      return res.json({ msg: "you not have pending request" })
    }

  }),
  blockFriend: asyncHandler(async (req, res) => {
    const { user_id, receiver_id } = req.body;

    const user_document = await User.findOne({
      '_id': mongoose.Types.ObjectId(user_id),
      'friends.user_id': receiver_id
    })

    let user;
    if (user_document === null) {
      const user = await addFriend(user_id, receiver_id, friendStatus.block)
    } else {
      const user = await updateFriend(user_id, receiver_id, friendStatus.block)

    }
    return res.status(200).json({ 'msg': 'block user success' })
  }),

  confirmFriendRequest: asyncHandler(async (req, res) => {
    const { user_id, receiver_id, is_accept } = req.body;

    const user_document = await User.findOne({
      _id: mongoose.Types.ObjectId(user_id),
    });

    var user_document_friends = user_document.friends.filter((e) => {
      return e.user_id == receiver_id;
    });

    console.log(user_document_friends[0]);

    if (user_document_friends.length === 0) {
      return res.status(400).send("you not have request from this user");
    } else if (user_document_friends[0].status === friendStatus.accepting) {
      if (is_accept) {
        const user = await updateFriend(
          user_id,
          receiver_id,
          friendStatus.friended
        );
        // if (user.friends.) {}
        if (user) {
          await updateFriend(receiver_id, user_id, friendStatus.friended);
          return res.status(200).send("Now! You already have a new friend");
        } else {
          res.status(400).send("you no have request from this user");
        }
      } else {
        const user = await removeFriend(user_id, receiver_id);
        if (user) {
          await removeFriend(receiver_id, user_id);
          return res.send("denied request user success");
        } else {
          res.status(400).send("you no have request friend from this user");
        }
      }
    } else if (user_document_friends[0].status === friendStatus.friended) {
      return res.status(400).send("you and this user is friended");
    } else {
      return res.send("you are not have permission accept this user");
    }
  }),

  // getAll: asyncHandler(async (req, res) => {
  //   const users = await new BaseRepository(User).getAll();
  //   return res.status(200).json(users);
  // }),

  getById: asyncHandler(async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      const user_document = await User.findById({ _id });
      if (user_document) {
        return res.status(200).json(new UserResponse(user_document).custom());
      } else {
        return res.status(404).json({ mess: "not found user" });
      }
    } catch (err) {
      console.log(err);
    }
  }),
};

module.exports = userController;