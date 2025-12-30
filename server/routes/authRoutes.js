const router = require("express").Router();
const { signup, login } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

// Validation middleware
const validateSignup = [
  body('full_name').trim().notEmpty().withMessage("Full name is required"),
  body('email').isEmail().withMessage("Invalid email format"),
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

const validateLogin = [
  body('email').isEmail().withMessage("Invalid email format"),
  body('password').notEmpty().withMessage("Password is required")
];

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

module.exports = router;