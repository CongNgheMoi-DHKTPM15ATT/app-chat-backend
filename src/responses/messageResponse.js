module.exports = class MessageResponse {
  constructor(message) {
    this.message = message
  }
  custom() {
    return {
      _id: this.message._id,
      content: this.message.content,
      content_type: this.message.content_type,
      deleted: this.message.deleted,
      createdAt: this.message.createdAt,
      updatedAt: this.message.updatedAt,
    }
  }
}