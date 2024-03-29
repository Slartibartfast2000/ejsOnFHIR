const parseXML = require('./xmlParser'); // Assuming xmlParser.js is in the same directory
const fileIO = require('./js/fileio');


const xmlFilePath = 'FHIR/Patient.schema.xml'; // Provide the path to your XML file
const parsedData = parseXML(xmlFilePath);
const crlf = "\r\n";

myPartialEJS= "";

myPartialEJS += "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>My HTML Page</title><style></style></head><body>" + crlf;


myPartialEJS += "<div><form><table>"

for (const elementName in parsedData) {
    if (parsedData.hasOwnProperty(elementName)) {
        console.log("Element Name:", elementName);

        myPartialEJS += "<label for='text-input'>" + elementName + ":</label>" + crlf;

        myPartialEJS += "<input type='text' id='" + elementName + "' name='text-input' placeholder='Enter text here'><br>" + crlf;

        const attributes = parsedData[elementName];
        for (const attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                const attributeValue = attributes[attributeName];
                console.log("Attribute Name:", attributeName, ", Value:", attributeValue);
            }
        }
    }
}

myPartialEJS += "<table></form></div>";
myPartialEJS +="</body>";

filePath = "./src/views/myHTML.html";

///const data = "hello";

fileIO.writeToFile(filePath, myPartialEJS, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File written successfully.');
});

console.log(myPartialEJS);