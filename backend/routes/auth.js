const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// 📌 模擬一個使用者數據（應該用 MongoDB）
const users = [
  { email: "test@example.com", password: "$2a$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij" }, // 密碼: test1234
];

// 📌 登入 API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, "your_secret_key", { expiresIn: "1h" });
  res.json({ token });
});

// 📌 忘記密碼 API
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  res.json({ message: "Password reset link has been sent to your email" });
});

module.exports = router;
