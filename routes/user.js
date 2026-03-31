const { Router } = require("express");

const router = Router();

router.get("/signup", (req,res) => {
    res.render("signup");
});

router.get("/signin", (req,res) => {
    res.render("signin");
})

module.exports = router;