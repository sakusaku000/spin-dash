const router = require("express").Router();

// Root
router.get("/", require(`${srcDir}/controllers/avatar/RootController.js`))
// Get by ID
router.get("/:id.png", require(`${srcDir}/controllers/avatar/GetByIDController.js`));

module.exports = router;