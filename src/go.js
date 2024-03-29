const parseXML = require('./xmlParser'); // Assuming xmlParser.js is in the same directory

const xmlFilePath = 'FHIR/Patient.schema.xml'; // Provide the path to your XML file
const parsedData = parseXML(xmlFilePath);
console.log(parsedData);