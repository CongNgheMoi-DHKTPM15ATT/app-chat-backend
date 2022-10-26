const { generateAvatar } = require('./../utils/generateAvatar');

module.exports = class UserRespone {
  constructor(user) {
    this.user = user
  }

  custom() {
    return this.user ? {
      "_id": this.user._id,
      "user_name": this.user.user_name,
      "birth_day": this.user.birth_day,
      "friends": this.user.friends,
      "phone": this.user.phone,
      "avatar": this.user.avatar || generateAvatar(this.user.user_name, "white", "#009578"),
      "createdAt": this.user.createdAt,
      "updatedAt": this.user.updatedAt,
    } : {}
  }
  customWithoutFriends() {
    return this.user ? {
      "_id": this.user._id,
      "user_name": this.user.user_name,
      "birth_day": this.user.birth_day,
      "phone": this.user.phone,
      "avatar": this.user.avatar || generateAvatar(this.user.user_name, "white", "#009578"),
      "createdAt": this.user.createdAt,
      "updatedAt": this.user.updatedAt,
    } : {}
  }
}