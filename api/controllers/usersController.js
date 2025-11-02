/* eslint-env node */
/* global require, exports, __dirname */

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { Buffer } = require("buffer");

const usersPath = path.join(__dirname, "..", "users.json");

function readUsers() {
  try {
    if (!fs.existsSync(usersPath)) return [];
    const raw = fs.readFileSync(usersPath, "utf8") || "[]";
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read users.json:", e.message);
    return [];
  }
}

function writeUsers(data) {
  try {
    fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Failed to write users.json:", e.message);
    return false;
  }
}

function pubUser(u) {
  const { passwordHash: _passwordHash, ...rest } = u;
  return rest;
}

function requireAdmin(req) {
  const auth = req.headers.authorization || "";
  const token = auth.split(" ")[1];
  if (!token) return { ok: false, msg: "Unauthorized" };
  const email = Buffer.from(token, "base64").toString("utf8");
  const users = readUsers();
  const requestingUser = users.find((x) => x.email === email);
  if (!requestingUser) return { ok: false, msg: "Unauthorized" };
  if (requestingUser.role !== "admin") return { ok: false, msg: "Forbidden" };
  return { ok: true, user: requestingUser };
}

exports.listAllUsers = (req, res) => {
  const users = readUsers();
  res.status(200).json(users.map(pubUser));
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const users = readUsers();
  const user = users.find((u) => u.id === id || u.id === parseInt(id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(pubUser(user));
};

exports.createUser = (req, res) => {
  try {
    // admin-only
    const check = requireAdmin(req);
    if (!check.ok)
      return res
        .status(check.msg === "Forbidden" ? 403 : 401)
        .json({ error: check.msg });

    const { name, email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const users = readUsers();
    if (users.find((u) => u.email === email))
      return res.status(409).json({ error: "User already exists" });

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
    if (!writeUsers(users))
      console.warn("Could not persist new user to users.json");
    res.status(201).json(pubUser(newUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUser = (req, res) => {
  try {
    // Get current user from token
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const users = readUsers();
    const currentUser = users.find((u) => u.email === currentUserEmail);

    if (!currentUser) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const targetUserId = id || currentUser.id;
    const updated = req.body;

    const idx = users.findIndex(
      (u) => u.id === targetUserId || u.id === parseInt(targetUserId)
    );
    if (idx === -1) return res.status(404).json({ error: "User not found" });

    // Check permissions: user can update their own profile, or admin can update any profile
    const isSelfUpdate = users[idx].id === currentUser.id;
    const isAdmin = currentUser.role === "admin";

    if (!isSelfUpdate && !isAdmin) {
      return res
        .status(403)
        .json({ error: "Forbidden: You can only update your own profile" });
    }

    // If changing email, ensure uniqueness
    if (updated.email && updated.email !== users[idx].email) {
      if (users.find((u) => u.email === updated.email))
        return res
          .status(409)
          .json({ error: "Another user with this email already exists" });
    }

    // If updating password, hash it (only admins can update passwords of others)
    if (updated.password) {
      if (!isAdmin && !isSelfUpdate) {
        return res
          .status(403)
          .json({ error: "Forbidden: Cannot update password" });
      }
      users[idx].passwordHash = bcrypt.hashSync(updated.password, 10);
      delete updated.password;
    }

    // Update user data
    users[idx] = { ...users[idx], ...updated };
    if (!writeUsers(users))
      console.warn("Could not persist user update to users.json");

    // Generate new token if email changed and it's a self-update
    let newToken = token;
    if (isSelfUpdate && updated.email && updated.email !== currentUser.email) {
      newToken = Buffer.from(updated.email.toLowerCase().trim()).toString(
        "base64"
      );
    }

    const response = { ...pubUser(users[idx]) };
    if (isSelfUpdate) {
      response.token = newToken;
    }

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.deleteUser = (req, res) => {
  try {
    const check = requireAdmin(req);
    if (!check.ok)
      return res
        .status(check.msg === "Forbidden" ? 403 : 401)
        .json({ error: check.msg });

    const { id } = req.params;
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === id || u.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });
    users.splice(idx, 1);
    if (!writeUsers(users))
      console.warn("Could not persist user delete to users.json");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
