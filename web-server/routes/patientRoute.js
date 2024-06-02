const express = require("express");
const router = express.Router();

const Axios = require("axios");
const patientController = require("../controllers/patientController");


router.get("/", patientController.getPatientList);


//router.get("Patient/{id}", fhirController.getResource);






module.exports = router;