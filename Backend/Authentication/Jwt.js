/*

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties. They are often used for authentication and authorization purposes in web development. Here's an overview of how JSON Web Tokens work:

Structure:
A JWT consists of three parts: Header, Payload, and Signature, separated by dots (.). The typical format is:

header.payload.signature


Header: Contains information about the type of the token (JWT) and the signing algorithm being used, typically HMAC SHA256 or RSA.
Payload: Contains the claims, which are statements about an entity (typically, the user) and additional data. Claims are often divided into registered, public, and private claims.
Signature: Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.


Encoding:
Each part of the JWT (Header, Payload, Signature) is Base64Url encoded. The encoding is URL-safe, meaning it avoids characters that have special meanings in URLs.

Creating a Token:

The server creates a JWT by taking the Header and Payload, concatenating them with a dot, and then creating a signature using a secret key.
The resulting JWT is sent to the client.
Verifying a Token:

When the client sends a request with a JWT, the server verifies its authenticity.
It decodes the JWT (Base64Url decoding) and verifies the signature using the secret key.
If the signature is valid, the server can trust the information in the JWT.

*/
//app.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock user database (replace with MongoDB or another database)
const users = [];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const user = users.find((user) => user.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    // User authenticated, generate JWT
    const token = jwt.sign({ username }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user information to the request for further use
    req.user = decoded;
    next();
  });
};

// Example: Protect a route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});
