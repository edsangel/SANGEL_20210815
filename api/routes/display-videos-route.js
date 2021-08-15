const express = require("express");
const router = express.Router();

const displayVideos = require("../controllers/video-list");

router.get("/", displayVideos);

module.exports = router;
