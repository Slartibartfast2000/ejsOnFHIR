const axios = require("axios");


async function getApp(req, res) {
    console.debug("appController.getApp()");

    Patient = { "id": ""};

    try {

        res.render('../views/pages/index', { Patient });
    } catch (error) {
        res.status(500).send(`Error fetching data: ${error.message}`);
    }

    //try {
    //const response = await axios.get(url);
    //res.status(200).json(response.data);
    //} catch (error) {
    //res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    // }
}
/*
const getApp = async (req, res) => {
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
*/
module.exports = {
    getApp
};
