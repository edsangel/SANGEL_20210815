const express = require("express");
const router = express.Router();
const videoChecker = require("../controllers/video-checker");
const streamVideo = require("../controllers/video-streamer");

router.get("/:id", videoChecker);
router.get("/:id/play", streamVideo);

module.exports = router;
