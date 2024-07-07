
import axios from 'axios';
import fs from 'fs';
import express from 'express';

import fhirRoute from '../routes/fhirRoute.js';


const fhirBaseUrl = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';

export async function checkFhirEndpoint()
{

    console.debug("fhir.js: checkFhirBase() ", fhirBaseUrl );
    console.info("Check if fhir endpoint is available ...");
    
    try {

       const url = fhirBaseUrl + '/Patient?_summary=count';
       console.debug("fhir.js: ", url);

       const response = await axios.get(url);
       const totalPatientRecords = response.data.total;
       console.debug("Patient Records: ", totalPatientRecords);
       if (totalPatientRecords == 0) {
            console.info("fhir.js: Inserting test data ...");
            const filePath = './bundle.json';
            const bundleData = fs.readFileSync(filePath, 'utf8');
            const response = await axios.post(fhirServerUrl, bundleData, { headers });
            console.debug(response);
            
       }
    } catch (error) {
        console.error(error);
    //        res.status(500).json({ message: `Error fetching resource: ${error.message}` });
    }



    return true;

}

export default checkFhirEndpoint;