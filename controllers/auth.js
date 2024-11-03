const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const userDb = await User.findOne({ email });

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "Credentials are not valid - Email (delete this message in production)",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, userDb.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credentials are not valid - Password (delete this message in production)",
      });
    }

    // Generate JWT
    const token = await generateJWT(userDb.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error occurred while trying to log in",
    });
  }
};

module.exports = {
  login,
};
