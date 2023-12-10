const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./model/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match!" });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            username,
            password,
        });

        await user.save();

        res.status(200).send("Registration successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

mongoose
    .connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/broomes", {})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error while starting the server!");
        console.log(err);
    });
