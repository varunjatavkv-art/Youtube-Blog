const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

app.use(express.urlencoded({entended: false}))
// database connection
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => console.log(`Error in connection: ${err}`))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", (req,res) => {
    res.render("home");
});
app.use("/user" ,userRouter);
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))