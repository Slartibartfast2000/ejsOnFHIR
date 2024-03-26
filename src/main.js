const fs = require('fs');

// Path to your JSON file
const filePath = 'FHIR/fhir.schema.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  try {
    const jsonData = JSON.parse(data);

    // Check if jsonData is an object
    if (typeof jsonData === 'object' && jsonData !== null) {
      // Iterate through the properties of the object
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          console.log(`Property: ${key}, Value:`, jsonData[key]);
        }
      }
    } else {
      console.error('Invalid JSON data:', jsonData);
    }
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
