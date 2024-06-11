import express from 'express';
//import axios from 'axios'; // If axios is needed here, otherwise remove this line
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get("/", getPatient);
router.get("/patientform", );

export default router;
