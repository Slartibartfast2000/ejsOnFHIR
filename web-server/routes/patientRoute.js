import express from 'express';
//import axios from 'axios'; // If axios is needed here, otherwise remove this line
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get("/", getPatient);
router.get("/patientform", getPatient);
router.get('/patientRecord', async (req, res) => {
    console.debug('/patient/patientRecord');

    const { id } = req.query;
    console.debug("id:", id);
 
    try {
      const response = await fetch(`http://localhost:8080/fhir/Patient/${id}`);
        //console.debug(response);
      const patient = await response.json();
      
      res.render('partials/Patient/patientDetail', { patient });
    } catch (error) {
      console.error('Error fetching patient record:', error);
      res.status(500).send('Error fetching patient record');
    }
  });

export default router;
