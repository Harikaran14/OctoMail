const router = require("express").Router();
const passport = require("passport")

router.get('/google', 
    passport.authenticate("google",{
        scope:["profile", "email", "https://www.googleapis.com/auth/gmail.readonly"

        ]
    })

);

router.get("/google/callback",
    passport.authenticate("google",{
        failureRedirect:'/'
    }),
    (req,res)=>{
        res.send("Google Login Successful");
    }

);

module.exports=router;