const router = require("express").Router();

router.get("/", (req, res) => {
    res.redirect("https://95degrees.cafe");
})

module.exports = router;