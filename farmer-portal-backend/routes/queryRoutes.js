const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createQuery } = require("../controllers/queryController");

router.post("/", auth, createQuery);

module.exports = router;
