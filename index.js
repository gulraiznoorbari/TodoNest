require("dotenv").config();
const path = require("path");
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
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Database...");
        app.listen(process.env.PORT, "localhost", () => {
            console.log("Listening on PORT 8000...");
        });
    })
    .catch((error) => console.log(error));

if (process.env.NODE_ENV === "production") {
    // express middleware setup for deployment:
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
