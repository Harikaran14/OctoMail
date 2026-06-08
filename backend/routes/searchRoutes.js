const router = require("express").Router();
const ensureAuth = require("../middleware/authMiddleware");
const {semanticSearch} = require("../controllers/searchController");

router.post("/semantic",ensureAuth,semanticSearch );

module.exports= router;