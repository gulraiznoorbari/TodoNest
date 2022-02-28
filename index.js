require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const todo = require("./routes/todo");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.send("Express app is running...");
});

app.use("/api/auth", auth);
app.use("/api/todos", todo);

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Connected to Database...");
        app.listen(process.env.PORT, "localhost", () => {
            console.log("Listening on PORT 8000...");
        });
    })
    .catch((error) => console.log(error));
