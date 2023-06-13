const UserModel = require("../Model/User");
const bcrypt = require("bcrypt");
//Implementation of PasswordEncoder that uses the BCrypt strong hashing function
const jwt = require("jsonwebtoken");
//JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
const SECRET_KEY = "NOTESAPI ";
const signup = async (req, res) => {
//existing user check
//hashed password== generally password is not directly saved as plain text we encrypt or hash it after that we save it so that even if our database is hacked hackers dont get exact password
  //user creation
  //generate tokens
  const { username, email, password } = req.body;
  try {
    //to check existing user
    const existingUser = await UserModel.findOne({ email: email });
    //serach in database whether exising user exist
    //await means it will take some time to find as it is searching in database so till then wait
    //await is used for assync fxn only
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // The salt is there to prevent rainbow tables, which are lists of common passwords, or just brute force, etc... 
    //salt = 10 number of times hashing will take

    const result = await UserModel.create({
      email: email,
      password: hashPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
//signup == user  is registering for 1st time

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //to check existing user
    const existingUser = await UserModel.findOne({ email: email });
    //serach in database whether exising user exist
    //await means it will take some time to find as it is searching in database so till then wait
    //await is used for assync fxn only
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    //existinguser.password = hashed password
    //password = normal string wala password

    if (!matchPassword) {
      res.status(400).json({ message: "Invalid Credetential" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { signup, signin };

