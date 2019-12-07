import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import config from "../config";

interface IUserDoc extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter full name"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },

    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user["password"], salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user["password"] = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.getPublicFields = function() {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export default mongoose.model<IUserDoc>("User", UserSchema);
