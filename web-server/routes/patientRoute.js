const express = require("express");
const router = express.Router();

const Axios = require("axios");
const patientController = require("../controllers/patientController");


router.get("/", patientController.getPatientList);


module.exports = router;