const router = require("express").Router();
const {getEmails,getStoredEmails, getEmailsByCategory} = require("../controllers/emailController");
const ensureAuth =require("../middleware/authMiddleware");

router.get("/fetch",ensureAuth, getEmails);
router.get("/stored",ensureAuth,getStoredEmails);
router.get("/category/:category", ensureAuth,getEmailsByCategory);
module.exports=router;

