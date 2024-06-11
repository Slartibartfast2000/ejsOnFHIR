import axios from 'axios';

export const getPatient = async (req, res) => {
    console.debug("patientController.getPatient: ", req.query);
    const patientId = req.query.PatientId;
    console.debug('PatientId', patientId);
    
    try {
        const response = await axios.get(`http://localhost:3000/fhir/Patient/${patientId}`); // Replace with your actual API URL
        const Patient = response.data;
        console.debug(Patient);

        res.render('../views/partials/Patient/Patient', { Patient });
    } catch (error) {
        res.status(500).send(`Error fetching data: ${error.message}`);
    }
};

export default getPatient;
