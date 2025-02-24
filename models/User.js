const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String,  minLength: 3,
    unique:true
  },
 
 password: { type: String,  minLength: 4},
 membership_status: { type: Boolean, default: false },
 
 admin: {type: Boolean, default: false}
});



// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/Users/${this._id}`;
});


    

// Export model
module.exports = mongoose.model("User", UserSchema);