
import axios from 'axios';
import express from 'express';

import fhirRoute from '../routes/fhirRoute.js';


const fhirBaseUrl = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';

export async function checkFhirEndpoint()
{

    console.debug("fhir.js: checkFhirBase() ", fhirBaseUrl );
    console.info("Check if fhir endpoint is available");
    
    try {

       // fhirRoute.getResource();
       console.debug("read from FHIR Server");

       const response = await axios.get(fhirBaseUrl);
        console.debug("read from FHIR Server", response.data);

    } catch (error) {
        console.error(error);
        
//        res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }



    return true;

}

export default checkFhirEndpoint;