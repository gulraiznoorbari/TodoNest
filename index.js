const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("Express app is running...");
});

app.post("/name", (req, res) => {
    if (req.body.name) {
        res.json({ name: req.body.name });
    } else {
        res.status(400).json({ name: "No name provided" });
    }
});

app.listen(process.env.PORT, "localhost", () => {
    console.log("Listening on PORT 8000...");
});
