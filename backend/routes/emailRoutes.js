const router = require("express").Router();
const {getEmails,getStoredEmails, getEmailsByCategory} = require("../controllers/emailController");
const ensureAuth =require("../middleware/authMiddleware");
const refreshAccessToken =
require("../services/tokenService");

router.get(
    "/test-token",
    async(req,res)=>{

        const token =
        await refreshAccessToken(
            req.user.refreshToken
        );

        res.json({
            token
        });

    }
);
router.get("/fetch",ensureAuth, getEmails);
router.get("/stored",ensureAuth,getStoredEmails);
router.get("/category/:category", ensureAuth,getEmailsByCategory);
module.exports=router;

