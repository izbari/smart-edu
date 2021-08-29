const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  try {
    res.status(201).json({ status: "success", user });
  } catch {
    res.status(400).json({ status: "fail", error });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
-            res.status(200).send("YOU ARE LOGGED IN");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};
