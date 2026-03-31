const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signup", (req,res) => {
    res.render("signup");
});

router.get("/signin", (req,res) => {
    res.render("signin");
});

router.post("/signup", async (req,res) => {
    try {
        const {fullName, email, password} = req.body;
        const newUser = await User.create({
            fullName,
            email,
            password
        });
       return res.redirect("/");

    } catch (error) {
       console.log(error);
    }
});

router.post("/signin", async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.matchPassword(email,password);
        console.log("user", user);
        
       return res.redirect("/");

    } catch (error) {
       console.log(error);
    }
});

module.exports = router;