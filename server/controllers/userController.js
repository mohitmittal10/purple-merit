const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Get Current User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await pool.query("SELECT user_id, full_name, email, role, created_at FROM users WHERE user_id = $1", [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    let query, params;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        query = "UPDATE users SET full_name = $1, email = $2, password_hash = $3, updated_at = NOW() WHERE user_id = $4 RETURNING full_name, email";
        params = [full_name, email, hash, req.user.id];
    } else {
        query = "UPDATE users SET full_name = $1, email = $2, updated_at = NOW() WHERE user_id = $3 RETURNING full_name, email";
        params = [full_name, email, req.user.id];
    }
    
    const updatedUser = await pool.query(query, params);
    res.json(updatedUser.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get All Users (Pagination)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const users = await pool.query(
      "SELECT user_id, full_name, email, role, status, last_login FROM users ORDER BY user_id ASC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    
    const count = await pool.query("SELECT COUNT(*) FROM users");
    
    res.json({
      users: users.rows,
      totalPages: Math.ceil(count.rows[0].count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update Status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'active' or 'inactive'
    
    await pool.query("UPDATE users SET status = $1 WHERE user_id = $2", [status, id]);
    res.json({ message: `User ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};