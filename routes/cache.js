const router = require("express").Router();

// Check key
router.use(require(`${srcDir}/middleware/KeyChecker.js`));

// Root
router.post("/", require(`${srcDir}/controllers/cache/ClearCacheController.js`));

module.exports = router;