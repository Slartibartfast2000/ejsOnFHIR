const axios = require("axios");

const getPatient = async (req, res) => {
    console.debug("patientController.getPatient: ", req.query);

    try {
        const response = await axios.get('http://localhost:3000/fhir/Patient/1'); // Replace with your actual API URL
        const Patient = response.data;
        console.debug(Patient);

        res.render('../views/partials/Patient/Patient', { Patient });
      } catch (error) {
        res.status(500).send(`Error fetching data: ${error.message}`);
      }
  
};

module.exports = {
    getPatient
  };
  