/* eslint-env node */
/* global require, exports, __dirname */

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { Buffer } = require("buffer");

const User =
  process.env.USE_MONGODB === "true" ? require("../models/User") : null;
const usersPath = path.join(__dirname, "..", "users.json");

// Helper functions for JSON fallback
function readUsers() {
  if (!fs.existsSync(usersPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf8");
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    if (process.env.USE_MONGODB === "true" && User) {
      // MongoDB implementation
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ error: "User already exists" });
      }

      const user = await User.create({
        name: name || email.split("@")[0],
        email,
        passwordHash: password, // Will be hashed by pre-save middleware
        role: role || "user",
      });

      const token = Buffer.from(email).toString("base64");
      const publicUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      res.status(201).json({ user: publicUser, token });
    } else {
      // JSON fallback
      const users = readUsers();
      const exists = users.find((u) => u.email === email);
      if (exists) {
        return res.status(409).json({ error: "User already exists" });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      const newUser = {
        id,
        name: name || email.split("@")[0],
        email,
        passwordHash,
        role: role || "user",
      };
      users.push(newUser);
      writeUsers(users);

      const token = Buffer.from(email).toString("base64");
      const { passwordHash: _passwordHash, ...publicUser } = newUser;
      res.status(201).json({ user: publicUser, token });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    if (process.env.USE_MONGODB === "true" && User) {
      // MongoDB implementation
      const user = await User.findOne({ email }).select("+passwordHash");
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const ok = await user.matchPassword(password);
      if (!ok) return res.status(401).json({ error: "Invalid credentials" });

      const token = Buffer.from(email).toString("base64");
      const publicUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      res.status(200).json({ user: publicUser, token });
    } else {
      // JSON fallback
      const users = readUsers();
      const user = users.find((u) => u.email === email);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const ok = bcrypt.compareSync(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: "Invalid credentials" });

      const token = Buffer.from(email).toString("base64");
      const { passwordHash: _passwordHash, ...publicUser } = user;
      res.status(200).json({ user: publicUser, token });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
