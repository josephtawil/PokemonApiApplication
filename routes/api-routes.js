const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/api", (req, res) => {
    res.json({ msg: "Success" });
});

module.exports = router;