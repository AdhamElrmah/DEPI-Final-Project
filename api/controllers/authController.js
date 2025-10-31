/* eslint-env node */
/* global require, exports, __dirname */

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { Buffer } = require("buffer");

const usersPath = path.join(__dirname, "..", "users.json");

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

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

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

  // Return a simple token (base64 of email) for demo purposes
  const token = Buffer.from(email).toString("base64");
  const { passwordHash: _passwordHash, ...publicUser } = newUser;
  res.status(201).json({ user: publicUser, token });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = Buffer.from(email).toString("base64");
  const { passwordHash: _passwordHash, ...publicUser } = user;
  res.status(200).json({ user: publicUser, token });
};
