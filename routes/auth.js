const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route   GET /api/auth/test
// @desc    Test the auth route
// @access  Public
router.get("/test", (req, res) => {
    res.send("Auth route working...");
});

// @route   POST /api/auth/register
// @desc    Create a new User
// @access  Public
router.post(
    "/register",
    [
        check("email", "Please provide a valid email.").isEmail(),
        check("password", "Password should be greater than 7 characters.").isLength(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({
                    errors: errors.arrays(),
                });
            }
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                email: req.body.email,
                password: hashPassword,
                name: req.body.name,
            });
            const savedUser = await newUser.save();
            return res.json(savedUser);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    },
);

module.exports = router;
