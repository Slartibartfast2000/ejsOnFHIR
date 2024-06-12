import axios from 'axios';

/* CRUDS */
export async function readResource(req, res) {
    console.debug("fhirController.getResource:");
    
    const { resourceType, id } = req.params;
    const baseUrl = 'http://localhost:8080/fhir'; // Replace with your actual FHIR API base URL

    console.debug("getResource:", resourceType, id);
    const url = `${baseUrl}/${resourceType}/${id}`;
    console.debug('getResource: ', url);

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }
}

export async function searchResource( req,res) {

    const { resourceType } = req.params;
    const queryString = req.query;

    console.log('Resource Type:', resourceType);
    console.log('Query String:', queryString);
}

export default {readResource, searchResource};
