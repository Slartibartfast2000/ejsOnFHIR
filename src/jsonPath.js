const fs = require('fs');
const jsonpath = require('jsonpath');

// Path to your JSON file
const filePath = 'FHIR/fhir.schema.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // JSONPath query
//    const result = jsonpath.query(jsonData, '$.store.book[?(@.price < 10)].title');
//    const result = jsonpath.query(jsonData, '$..properties[?(@.const === "Patient")].description');
    const result = jsonpath.query(jsonData, '$..definitions[?(@.const===@.definitions)]');

    console.log(result); // Output: ['Book 3']
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
