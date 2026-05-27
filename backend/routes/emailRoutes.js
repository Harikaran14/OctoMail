const router = require("express").Router();
const {getEmails} = require("../controllers/emailController");

router.get("/fetch",getEmails);
module.exports=router;

