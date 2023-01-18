const User = require("../models/users");
const bcrypt = require("bcryptjs");

class UserController {
  static async findAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: `Internal server error` });
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      if (!user) {
        throw { name: `not_found` };
      }
      res.status(200).json(user);
    } catch (error) {
      if (error.name == "not_found") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(500).json({ message: `Internal server error` });
      }
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!username || !email || !password || !phoneNumber || !address)
        throw { name: "field_required" };
      const input = {
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        phoneNumber,
        address,
        role: "admin",
      };
      const created = await User.createUser(input);
      res.status(200).json(created);
    } catch (error) {
      error.name == "field_required"
        ? res.status(400).json({ msg: "all fields are required" })
        : error.name == "email_registered"
        ? res.status(400).json({ msg: `Email already registered` })
        : error.name == "username_registered"
        ? res.status(400).json({ msg: `Username already registered` })
        : res.status(500).json({ msg: `Internal server error` });
    }
  }

  static async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.deleteOne(id);
      res.status(200).json(user);
    } catch (error) {
      if (error.name == "User is not exist") {
        res.status(404).json({ msg: `User is not exist` });
      } else {
        res.status(500).json({ msg: `Internal Server Error` });
      }
    }
  }
}

module.exports = UserController;
