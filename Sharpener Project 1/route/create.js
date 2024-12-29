const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ users });
    } catch (e) {
      console.error("Error fetching users: ", e);
      res.status(500).json({ message: "Error happened", error: e.message });
    }
  });

  
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { uname, phno, email } = req.body;
    console.log(uname, phno, email);
  
    try {
      const existingUser = await User.findByPk(id);
      console.log(existingUser);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      existingUser.username = uname || existingUser.username;
      existingUser.phone_number = phno || existingUser.phone_number;
      existingUser.email = email || existingUser.email;
  
      await existingUser.save();
  
      res.status(200).json({ message: "User updated successfully", user: existingUser });
    } catch (e) {
      console.error("Error updating user: ", e);
      res.status(500).json({ message: "Error happened", error: e.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      console.error("Error fetching user:", e);
      res.status(500).json({ message: "Error fetching user", error: e.message });
    }
  });

router.post("/", async (req, res) => {
  const { uname, phno, email } = req.body;
  console.log(uname, phno, email);
  try {
    // Create a new user and send the result back
    const newUser = await User.create({ username: uname, phone_number: phno, email: email });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (e) {
    // Send the error message to the client for easier debugging
    console.error("Error creating user: ", e);
    res.status(500).json({ message: "Error happened", error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await User.findByPk(id);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Destroy (delete) the user with the given id
    await User.destroy({ where: { id: id } });

    // Send a success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    console.error("Error deleting user: ", e);
    res.status(500).json({ message: "Error occurred while deleting user", error: e.message });
  }
});


module.exports = router;
