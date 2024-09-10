const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  timestamp: { type: Date, default: Date.now},
  content: { type: String, required: true, maxLength: 300 },
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"User"   }
});



// Virtual for message URL
MessageSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/messages/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);