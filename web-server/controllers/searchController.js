import axios from 'axios';

//import fhirController from './fhirController';

const fhirBaseUrl = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';
/* CRUDS */

export async function searchResource(req, res) {
  console.debug("searchController.js searchResource(): ");
  //http://localhost:8080/fhir/Patient?family=Doe&given=John
  const { resourceType } = req.params;
  const queryString = req.query;

  console.log('Resource Type:', resourceType);
  console.log('Query String:', queryString);
  const queryParameters = req.originalUrl.split('?')[1];
  //const url = `${fhirBaseUrl}/${resourceType}?${queryParameters}`;
  const url = `${fhirBaseUrl}/Patient?${queryParameters}`;

  //    try {
  console.debug("calling fhir server with: ", url);

  const response = await axios.get(url);
  //res.status(200).json(response.data);

  //console.debug("searchResource", response.data.entry);

  res.render('partials/Search/searchResults', { entry: response.data.entry });


  //  } catch (error) {
  //    res.status(500).json({ message: `Error fetching resource: ${error.message}` });
  // }

}

export default { searchResource };
