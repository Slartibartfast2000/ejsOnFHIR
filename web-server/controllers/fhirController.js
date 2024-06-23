import axios from 'axios';

const fhirBaseUrl = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';
/* CRUDS */
export async function createResource(req, res) {


    console.debug("fhirRoute.js - createResource() - req.originalUrl: ", req.originalUrl);
    //const fhirResourceId  = req.params.id;
    const urlParts = req.originalUrl.split('/');
    const resourceType = urlParts[2]; // Assuming the resource type is the third part of the URL

    // const data = JSON.parse(JSON.stringify(req.body));
    //console.debug('put data: ', JSON.stringify(data, null, 2));

    console.debug("createResource:", resourceType, fhirResourceId);
    const url = `${fhirBaseUrl}/${resourceType}/${fhirResourceId}`;
    console.debug('createResource() Url: ', url);

    try {
        const response = await axios.delete(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error deleting resource:', error.message);
        res.status(500).json({ message: `Error deleteing resource: ${error.message}` });
    }

}




export async function readResource(req, res) {
    console.debug("fhirController.getResource:");

    const { resourceType, id } = req.params;

    console.debug("getResource:", resourceType, id);
    const url = `${fhirBaseUrl}/${resourceType}/${id}`;
    console.debug('getResource: GET =', url);

    try {
        const response = await axios.get(url);
        console.debug("Written to FHIR Server");

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }
}

export async function searchResource(req, res) {
    console.debug("searchResource()");
    //http://localhost:8080/fhir/Patient?family=Doe&given=John
    const { resourceType } = req.params;
    const queryString = req.query;

    console.log('Resource Type:', resourceType);
    console.log('Query String:', queryString);
    const queryParameters = req.originalUrl.split('?')[1];
    const url = `${fhirBaseUrl}/${resourceType}?${queryParameters}`;


    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }

}

export async function updateResource(req, res) {

    console.debug("fhirRoute.js - updateResource() - req.originalUrl: ", req.originalUrl);
    const fhirResourceId = req.params.id;
    const urlParts = req.originalUrl.split('/');
    const resourceType = urlParts[2]; // Assuming the resource type is the third part of the URL

    const data = JSON.parse(JSON.stringify(req.body));
    console.debug('put data: ', JSON.stringify(data, null, 2));

    console.debug("updateResource:", resourceType, fhirResourceId);
    const url = `${fhirBaseUrl}/${resourceType}/${fhirResourceId}`;
    console.debug('updateResource() Url: ', url);

    if (fhirResourceId == "0") {
        console.debug("Creat a new resource with POST");
        console.debug("data.id before", data.id);
        
        delete data.id;
        console.debug("data.id after", data.id);

        try { 
            url = `${fhirBaseUrl}/${resourceType}/`;
            const response = await axios.post(fhirBaseUrlurl, data);
            res.status(200).json(response.data);
            } catch (error) {
            console.error('Error fetching resource:', error.message);
            res.status(500).json({ message: `Error fetching resource: ${error.message}` });
        }
    } else { 
        try { 
            const response = await axios.put(url, data);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error fetching resource:', error);
            res.status(500).json({ message: `Error fetching resource: ${error.message}` });
        }
    }

}

export async function deleteResource(req, res) {

    console.debug("fhirRoute.js - deleteResource() - req.originalUrl: ", req.originalUrl);
    const fhirResourceId = req.params.id;
    const urlParts = req.originalUrl.split('/');
    const resourceType = urlParts[2]; // Assuming the resource type is the third part of the URL

    // const data = JSON.parse(JSON.stringify(req.body));
    //console.debug('put data: ', JSON.stringify(data, null, 2));

    console.debug("deleteResource:", resourceType, fhirResourceId);
    const url = `${fhirBaseUrl}/${resourceType}/${fhirResourceId}`;
    console.debug('deleteResource() Url: ', url);

    try {
        const response = await axios.delete(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error deleting resource:', error.message);
        res.status(500).json({ message: `Error deleteing resource: ${error.message}` });
    }

}



export default { readResource, searchResource, updateResource, deleteResource, createResource };
