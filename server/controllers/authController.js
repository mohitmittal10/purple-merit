const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }

    const { full_name, email, password } = req.body;
    
    // Validate required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING user_id, full_name, email, role, status",
      [full_name, email, hash, 'user', 'active']
    );

    if (!newUser.rows[0]) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign(
      { id: newUser.rows[0].user_id, role: newUser.rows[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      token, 
      user: newUser.rows[0],
      message: "Signup successful"
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.rows[0].status === 'inactive') {
      return res.status(403).json({ message: "Account is deactivated. Contact admin." });
    }

    const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Update last login
    await pool.query("UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE user_id = $1", [user.rows[0].user_id]);

    const token = jwt.sign(
      { id: user.rows[0].user_id, role: user.rows[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    
    // Remove password from response
    const userResponse = { ...user.rows[0] };
    delete userResponse.password_hash;

    res.json({ 
      token, 
      user: userResponse,
      message: "Login successful"
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};