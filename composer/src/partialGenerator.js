//const processArgs = require('./js/processArgs');
import processArgs from './js/processArgs.js';
import { DOMParser } from '@xmldom/xmldom';

//compose pallett
//const parseXMLSchema = require('./xmlParser'); // Assuming xmlParser.js is in the same directory
//import myparseXMLSchema from './xmlParser.js';
import xpath from 'xpath';

// file.js
import fs from 'fs';

// Function to create an XPath evaluator with namespace support
function createXPathEvaluator() {
    const select = xpath.useNamespaces({
        xs: 'http://www.w3.org/2001/XMLSchema'
    });
    return select;
}

//import  fileIO from './js/fileio.js';
function runXPathQuery(doc, query) {
    console.debug("runXPathQuery: ", query);
    const select = createXPathEvaluator();
    const nodes = select(query, doc);
    return nodes;
}

function parseXMLSchema(filePath) {
    const xml = fs.readFileSync(filePath, 'utf8');
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return doc;
}
console.debug("");
console.debug("**************************************************************************************");
console.debug("****************************** START *************************************************");
console.debug("**************************************************************************************");
console.debug("");

const myparameters = processArgs(process.argv);

const crlf = "\r\n";
const tab = "\t";

console.debug("reading schema: ", myparameters.xsdFilePath);
const parsedData = parseXMLSchema(myparameters.xsdFilePath);
console.debug("reading schema: done.");
///xs:schema/xs:complexType/@name
const resourceType = myparameters.resourceType; // "Patient";

const xpathQuery = `//xs:complexType[@name="${resourceType}"]/xs:complexContent/xs:extension/xs:sequence/*`;
// const xpathQuery = '//xs:complexType[@name="Patient"]/xs:complexContent/xs:extension/xs:sequence/*';

const elements = runXPathQuery(parsedData, xpathQuery);

let partialEJS = 
`<div>
<form id="${resourceType}">
`;

//partialEJS += "<form>" + crlf;
// Output the selected elements
elements.forEach((element) => {
    console.log(element.toString());
    const attributes = element.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        console.debug(`     ${attr.nodeName}: ${attr.nodeValue}`);
    }
    const name = element.getAttribute('name');

    partialEJS += `<input type='text' id='${resourceType}.${name}' name='${name}' placeholder='.'><br>"` + crlf;
});

partialEJS += 
    `</form>
    <div>`;
console.debug(partialEJS);

process.exit(0);

let myPartialEJS = "";

myPartialEJS += "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>My HTML Page</title><style></style></head><body>" + crlf;

myPartialEJS += "<div><form><table>" + crlf + tab;

for (const elementName in parsedData) {
    if (parsedData.hasOwnProperty(elementName)) {
        // console.log("Element Name:", elementName);

        myPartialEJS += "<label for='text-input'>" + elementName + ":</label>" + crlf;

        myPartialEJS += "<input type='text' id='" + elementName + "' name='text-input' placeholder='Enter text here'><br>" + crlf;

        const attributes = parsedData[elementName];
        for (const attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                const attributeValue = attributes[attributeName];
                // console.log("Attribute Name:", attributeName, ", Value:", attributeValue);
            }
        }
    }
}

myPartialEJS += "<table></form></div>";
myPartialEJS += "</body>";

///const data = "hello";

fileIO.writeToFile(myparameters.outputFilename, myPartialEJS, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File written successfully.');
});

//console.log(myPartialEJS);