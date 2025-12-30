const router = require("express").Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const { getProfile, updateProfile, getAllUsers, updateUserStatus } = require("../controllers/userController");

// User routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

// Admin routes
router.get("/admin/users", verifyToken, verifyAdmin, getAllUsers);
router.put("/admin/users/:id/status", verifyToken, verifyAdmin, updateUserStatus);

module.exports = router;