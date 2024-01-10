/*
In Express.js, you can use the express.Router to create modular, mountable route handlers. This is especially useful when building a RESTful API with multiple endpoints. Here's a basic example of how you can use express.Router:

Assuming you have a file named api.js:

*/

// route.js

const express = require("express");
const router = express.Router();

// Define routes using the router

// GET /api/users
router.get("/users", (req, res) => {
  // Handle GET /api/users
  res.json({ message: "Get all users" });
});

// POST /api/users
router.post("/users", (req, res) => {
  // Handle POST /api/users
  res.json({ message: "Create a new user" });
});

// GET /api/users/:id
router.get("/users/:id", (req, res) => {
  // Handle GET /api/users/:id
  const userId = req.params.id;
  res.json({ message: `Get user with ID ${userId}` });
});

// PUT /api/users/:id
router.put("/users/:id", (req, res) => {
  // Handle PUT /api/users/:id
  const userId = req.params.id;
  res.json({ message: `Update user with ID ${userId}` });
});

// DELETE /api/users/:id
router.delete("/users/:id", (req, res) => {
  // Handle DELETE /api/users/:id
  const userId = req.params.id;
  res.json({ message: `Delete user with ID ${userId}` });
});

// Export the router
module.exports = router;

//api.js

const express = require("express");
const app = express();
const apiRouter = require("./route");

// Use the router middleware for all routes starting with /api
app.use("/api", apiRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
