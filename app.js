// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Sample user data
let users = [
  {
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "5abf6783"
  },
  {
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "5abf674563"
  }
];

// GET API to retrieve all users
app.get('/users', (req, res) => {
  // Return JSON response with list of users
  res.json({
    message: "Users retrieved",
    success: true,
    users: users
  });
});

// PUT API to update a user
app.put('/update/:id', (req, res) => {
  // Extract user ID and updated fields from request
  const userId = req.params.id;
  const { email, firstName } = req.body;

  // Find the index of the user in the array
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    // If user not found, return 404 response
    return res.status(404).json({ message: "User not found", success: false });
  }

  // Update user's email and firstName
  users[userIndex].email = email;
  users[userIndex].firstName = firstName;

  // Return success response
  res.json({ message: "User updated", success: true });
});

// POST API to add a new user
app.post('/add', (req, res) => {
  // Extract email and firstName from request body
  const { email, firstName } = req.body;

  // Generate unique ID for new user
  const id = Date.now().toString();

  // Create new user object
  const newUser = { email, firstName, id };

  // Add new user to the list
  users.push(newUser);

  // Return success response
  res.json({ message: "User added", success: true });
});

// GET API to retrieve a single user by ID
app.get('/user/:id', (req, res) => {
  // Extract user ID from request parameters
  const userId = req.params.id;

  // Find user with specified ID
  const user = users.find(user => user.id === userId);
  if (!user) {
    // If user not found, return 404 response
    return res.status(404).json({ message: "User not found", success: false });
  }

  // Return success response with user data
  res.json({ success: true, user: user });
});

// Start the server and listen on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
