const express = require("express");
const fhirRouter = express.Router();
const fhirController = require('../controllers/fhirController');

fhirRouter.get('/:resourceType/:id', fhirController.getResource);

module.exports = fhirRouter;
