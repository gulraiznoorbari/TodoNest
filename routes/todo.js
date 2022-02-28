const express = require("express");
const router = express.Router();
const todoModel = require("../models/todo");
const auth = require("../middleware/permissions");

// @route   GET /api/todo
// @desc    Test the todo route
// @access  Public
router.get("/test", (req, res) => {
    res.send("Todo route is working...");
});

// @route   POST /api/todos/new
// @desc    Create a new todo
// @access  Private
router.post("/new", auth, async (req, res) => {
    try {
        const newTodo = new todoModel({
            user: req.user._id,
            content: req.body.content,
            complete: false,
        });
        await newTodo.save();
        return res.json(newTodo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// @route   GET /api/todos/current
// @desc    Current users todo
// @access  Private
router.get("/current", auth, async (req, res) => {
    try {
        const completedTodos = await todoModel
            .find({
                user: req.user._id,
                complete: true,
            })
            .sort({ completedAt: -1 });
        const incompleteTodos = await todoModel
            .find({
                user: req.user._id,
                complete: false,
            })
            .sort({ createdAt: -1 });
        return res.json({ complete: completedTodos, incomplete: incompleteTodos });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
