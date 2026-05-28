const router = require("express").Router();
const {getEmails,getStoredEmails} = require("../controllers/emailController");
const ensureAuth =require("../middleware/authMiddleware");

router.get("/fetch",ensureAuth, getEmails);
router.get("/stored",ensureAuth,getStoredEmails);
module.exports=router;

