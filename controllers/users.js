const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already registered",
      });
    }

    // Create user with the model
    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    
    // Save user
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error occurred. Please contact the administrator",
    });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({}, "name email role google");

  res.json({
    ok: true,
    msg: "Get all users",
    users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, "name email role google");
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    res.json({
      ok: true,
      msg: "Get user by id",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "An error occurred. Please contact the administrator",
    });
  }
};

const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { password, google, email, ...rest } = req.body;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    const fields = req.body;

    if (userDb.email !== email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: "Email already exists",
        });
      }
    }

    fields.email = email;

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error occurred. Please contact the administrator",
    });
  }
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "User deleted successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error occurred. Please contact the administrator",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
