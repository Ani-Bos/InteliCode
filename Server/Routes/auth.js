const User = require("../Model/Model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//Implementation of PasswordEncoder that uses the BCrypt strong hashing function
const jwt = require("jsonwebtoken");
//JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
const SECRET_KEY = "NOTESAPI ";
const filter = require("../Middleware/Middleware");

router.post("/createUser", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        status: "user already exists",
        mark: true,
      });
    }
    // const salt=await bcrypt.genSalt(10);
    // const secPass=await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name || "", // Make the "name" field optional
      // phone: req.body.phone,
      email: req.body.email,
      // address: req.body.address,
    });
    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, SECRET_KEY);
    res.json({ status: "User added to database", authToken: authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "please try to login with corrrect credentials" });
    }

    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, SECRET_KEY);
    res.json({ status: "User loggedin", authToken: authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.post("/getuser", filter, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ status: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.delete("/deleteuser", filter, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Unauthorized");
    }
    user = await User.findByIdAndDelete(req.user.id);
    res.json({ success: "Your account has been deleted", deleteduser: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.put("/updateuser", filter, async (req, res) => {
  const { email, name, phone, address } = req.body;
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: "Unauthorized" });
    }
    const updateduser = await User.findByIdAndUpdate(
      req.user.id,
      {
        email: email ? email : user.email,
        name: name ? name : user.name,
        phone: phone ? phone : user.phone,
        address: address ? address : user.address,
      },
      { new: true }
    );
    res.json({ status: "User info Updated", updatedinfo: updateduser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error Occured");
  }
});
module.exports = router;
