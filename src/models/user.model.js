const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:[{type:String}]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hasing without bcrypt use pre middleware

// userSchema.pre("save",function(next){
//     let hashedPassword = this.password + "secret";
//     this.password = hashedPassword
//     return next()
// })

userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("user", userSchema);
