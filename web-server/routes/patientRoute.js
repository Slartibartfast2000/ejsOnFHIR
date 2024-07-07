import express from 'express';
//import axios from 'axios'; // If axios is needed here, otherwise remove this line
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

/* Save Patient */
router.put('/:id', async (req, res) => {
  console.debug("patientRoute.js: PUT /Patient/:id ");
  const data = JSON.parse(JSON.stringify(req.body));
  // const patientData = await readJSONFile(path.join(__dirname, '../FHIR/data/Patient.json'));
  console.debug('data: ', JSON.stringify(data,null,2));
  
  res.status(200).json({ message: 'Patient updated successfully', data });
});

router.get("/", getPatient);

router.get("/patientform", getPatient);

router.get('/patientRecord', async (req, res) => {
    console.debug('/patient/patientRecord');

    const { id } = req.query;
    console.debug("id:", id);
    if (!id) {
      console.debug("id is undefined");

    }

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

  router.get('/patientRegister', async (req, res) => {
    console.debug('/patient/patientRegister');

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
