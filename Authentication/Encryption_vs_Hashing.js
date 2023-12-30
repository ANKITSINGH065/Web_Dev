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

const bcrypt = require("bcryptjs");
const User = require("./userModel"); // Adjust the path accordingly

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (user && (await bcrypt.compare(password, hashedPassword))) {
      console.log("Login successful");
    } else {
      console.log("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

loginUser("exampleuser", "securepassword");
