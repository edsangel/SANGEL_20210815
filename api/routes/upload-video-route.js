const express = require("express");
const router = express.Router();
const uploadVideo = require("../controllers/video-upload");

router.post("/", uploadVideo);

module.exports = router;
