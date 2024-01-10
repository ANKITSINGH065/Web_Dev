/*

Purpose:
Encryption: The primary purpose of encryption is to protect data confidentiality. It involves converting plaintext (readable data) into ciphertext (unreadable data) using an algorithm and a key. The goal is to make the data unreadable to unauthorized users, and it can be reversed with the appropriate decryption key.
Hashing: The main purpose of hashing is to verify data integrity and create a fixed-size representation of data. Hash functions take input (data of any size) and produce a fixed-size hash value. Hashing is a one-way process, meaning it should be computationally infeasible to reverse the hash value to obtain the original data.

*/

/*

Install Required Packages:
Make sure you have bcryptjs and mongoose installed. If not, install them using

npm install bcryptjs mongoose

*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//app.js

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const User = require("./userModel"); // Adjust the path accordingly

mongoose.connect("mongodb://localhost:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  try {
    const newUser = new User({
      username: "exampleuser",
      password: "securepassword",
    });

    await newUser.save();
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error.message);
  } finally {
    // Close the MongoDB connection
    db.close();
  }
});
