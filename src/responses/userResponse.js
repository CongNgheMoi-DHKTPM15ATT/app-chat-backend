module.exports = class UserRespone {
  constructor(user) {
    this.user = user
  }

  custom() {
    return {
      "_id": this.user._id,
      "user_name": this.user.user_name,
      "birth_day": this.user.birth_day,
      "friends": this.user.friends,
      "phone": this.user.phone,
      "createdAt": this.user.createdAt,
      "updatedAt": this.user.updatedAt,
    }
  }
}