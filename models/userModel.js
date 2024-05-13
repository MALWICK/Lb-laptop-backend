const mongoose = require("mongoose"); // Erase if already required
const { options } = require("../routes/authRoutes");
var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: {
      type: String,
      enum: ["admin","manager","client"],
      default: "client",
    },
    status: {
      type: Number,
      default: 0,
    },
  },
});

userSchema.pre("save", function (next) {
  if (this.role.type === "admin") {
    this.role.status = "1";
  } else if (this.role.type === "manager") {
    this.role.status = "2";
  } else {
    this.role.status = "0";
  }
  next();
});

module.exports = mongoose.model("User", userSchema);