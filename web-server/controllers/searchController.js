import axios from 'axios';

//import fhirController from './fhirController';

const fhirBaseUrl = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';
/* CRUDS */

export async function searchResource(req, res) {
  console.debug("searchController.js searchResource(): ");
  //http://localhost:8080/fhir/Patient?family=Doe&given=John
  const { resourceType } = req.params;
  //const queryString = req.query;

  console.log('Resource Type:', resourceType);
  //console.log('Query String:', queryString);
  console.log('originalUrl:', req.originalUrl);
  const queryParameters = req.originalUrl.split('?')[1];
  console.debug('queryParameters:', queryParameters);

  const url = `${fhirBaseUrl}/Patient?${queryParameters}`;

  console.debug("calling fhir server with: ", url);

  const response = await axios.get(url);


  res.render('partials/Search/patientSearchResults', { entry: response.data.entry });


  //  } catch (error) {
  //    res.status(500).json({ message: `Error fetching resource: ${error.message}` });
  // }

}

export default { searchResource };
