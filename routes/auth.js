const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validateUserInfo = require("../validation/registerValidation");

// @route   GET /api/auth/test
// @desc    Test the auth route
// @access  Public
router.get("/test", (req, res) => {
    res.send("Auth route working...");
});

// @route   POST /api/auth/register
// @desc    Create a new User
// @access  Public
router.post("/register", async (req, res) => {
    try {
        const { errors, isValid } = validateUserInfo(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Check for existing email:
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i"),
        });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists!" });
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
});

module.exports = router;
