const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;

const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", (req,res) => {
    res.render("home");
});
app.use("/user" ,userRouter);
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))