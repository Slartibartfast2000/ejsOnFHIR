const express = require("express");
const router = express.Router();

//const Axios = require("axios");
const appController = require("../controllers/appController");

router.get("/", appController.getApp);

export default router;

//module.exports = router;