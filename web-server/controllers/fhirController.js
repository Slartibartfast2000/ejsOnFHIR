const axios = require('axios');


async function getResource(req, res) {
  console.debug("fhirController.getResource:");
    
  const { resourceType, id } = req.params;
    const baseUrl = 'http://localhost:8080/fhir'; // Replace with your actual FHIR API base URL
  
    console.debug("getRsource:", resourceType, id);
    
    try {
      const response = await axios.get(`${baseUrl}/${resourceType}/${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }
  }
  
  module.exports = { getResource };