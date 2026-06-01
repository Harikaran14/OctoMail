const router = require("express").Router();

const ensureAuth = require("../middleware/authMiddleware");

const {
    processEmails
} = require("../controllers/aiController");

router.post(
    "/process",
    ensureAuth,
    processEmails
);

module.exports = router;