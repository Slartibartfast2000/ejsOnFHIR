const parseXML = require('./xmlParser'); // Assuming xmlParser.js is in the same directory

const xmlFilePath = 'FHIR/Patient.schema.xml'; // Provide the path to your XML file
const parsedData = parseXML(xmlFilePath);


for (const elementName in parsedData) {
    if (parsedData.hasOwnProperty(elementName)) {
        console.log("Element Name:", elementName);
        const attributes = parsedData[elementName];
        for (const attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                const attributeValue = attributes[attributeName];
                console.log("Attribute Name:", attributeName, ", Value:", attributeValue);
            }
        }
    }
}

//console.log(parsedData);