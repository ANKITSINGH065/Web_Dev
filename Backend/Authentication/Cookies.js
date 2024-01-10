/*

Storing JWT (JSON Web Tokens) in an HTTPOnly cookie is a good security practice as it helps to mitigate certain types of attacks, such as Cross-Site Scripting (XSS). By marking a cookie as HTTPOnly, you prevent client-side scripts from accessing the cookie, making it more difficult for attackers to steal the token.

Here's an example of how you can create an HTTPOnly cookie in Node.js using the `express` framework:

*/

// ```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "your-secret-key"; // Replace with your actual secret key

app.use(express.json());
app.use(cookieParser());

// Route to generate and set JWT token in HTTPOnly cookie
app.post("/login", (req, res) => {
  // In a real-world scenario, you would typically authenticate the user and generate a token
  const user = { id: 1, username: "example" };

  // Create a JWT token
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

  // Set the token in an HTTPOnly cookie
  res.cookie("jwt", token, { httpOnly: true });

  res.json({ message: "Login successful" });
});

// Route to access a protected resource using the JWT token
app.get("/protected", (req, res) => {
  // Check if the user is authenticated (you might want to use middleware for this)
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // You can now use the decoded information to identify the user

    res.json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
In this example:

1. The `/login` endpoint generates a JWT token and sets it in an HTTPOnly cookie named 'jwt'.
2. The `/protected` endpoint checks for the presence of the JWT token in the cookie and verifies it. If the token is valid, access is granted; otherwise, the request is considered unauthorized.

Make sure to replace 'your-secret-key' with a strong and secret key for JWT signing. Also, note that this example doesn't cover user authentication and is simplified for demonstration purposes. In a real application, you would implement proper user authentication before generating and validating JWTs.

*/
