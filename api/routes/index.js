const express = require("express");
const router = express.Router();

const displayVideos = require("./display-videos-route");
const streamVideo = require("./stream-video-route");
const uploadVideo = require("./upload-video-route");
const categories = require("./category-route");

router.use("/videos", displayVideos);
router.use("/video", streamVideo);
router.use("/upload", uploadVideo);
router.use("/categories", categories);

module.exports = router;
