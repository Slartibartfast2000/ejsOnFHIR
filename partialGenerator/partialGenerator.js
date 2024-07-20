import xpath from 'xpath';
import { DOMParser } from '@xmldom/xmldom';
import fs from 'fs';

import processArgs from './src/processArgs.js';

async function writeFile(filename, content) {
    try {
        await fs.promises.writeFile(filename, content);
        console.log('Partial has been written successfully to file: ', filename);
    } catch (err) {
        console.error('Error writing file:', err);
        throw err; // Throw the error to handle it appropriately
    }
}


function elementDetail(type, element) {
    const name = element.getAttribute('name');
    var tooltip = '';

    const attributes = element.attributes;
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            console.debug(`     ${attr.nodeName}: ${attr.nodeValue}`);
            tooltip += `${attr.nodeName}: ${attr.nodeValue}  `;
        }
    let newElement = `<div class="form-group">` + crlf;
    newElement += `<label for='${type}.${name}'>${name}</label>` + crlf;
    newElement += `<input type='text' id='${resourceType}.${name}' name='${name}' placeholder='.' title='${tooltip}'
    value="<%= data && data.${name} ? data.${name} : '' %>">
    </div>` + crlf;
    //newElement += `<title='${tooltip}'`;
    return newElement;

}

// Updated choiceDetail function
function choiceDetail(type, element) {
    // Create the XPath query to select child xs:element elements
    const query = 'xs:element';
    // Use runXPathQuery to get child elements
    const childElements = runXPathQuery(element, query);
    var newElement = "";
    var tooltip = "";
    childElements.forEach((element) => {
        console.debug(`Element tagname: [${element.tagName}]`);
        const attributes = element.attributes;
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            console.debug(`     ${attr.nodeName}: ${attr.nodeValue}`);
            tooltip += `${attribute.nodeName}: ${attr.nodeValue}`;
        }
        const name = element.getAttribute('name');
        newElement += `<div class='form-group'>` + crlf;
        newElement += `<label for='${type}.${name}'>${name}*</label>` + crlf;
        newElement += `<input type='text' id='${type}.${name}' name='${name}' placeholder='.'></div>` + crlf;
        newElement += `<title='${tooltip}'`;
    });
    
    return newElement;
}

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
const resourceType = myparameters.resourceType;

const xpathQuery = `//xs:complexType[@name="${resourceType}"]/xs:complexContent/xs:extension/xs:sequence/*`;
// const xpathQuery = '//xs:complexType[@name="Patient"]/xs:complexContent/xs:extension/xs:sequence/*';

const elements = runXPathQuery(parsedData, xpathQuery);

let partialEJS =
    `<div>
        <form id="${resourceType}">
        <h3>${resourceType} Resource:</h3>
        <label for='Encounter.id'>id</label>
        <input type="text" disabled id="${resourceType}.id" name="id"
        value="<%= data && data.id ? data.id : '' %>"
        ></input>
    `;

//partialEJS += "<form>" + crlf;
// Output the selected elements
elements.forEach((element) => {
    // console.log(element.toString());
    console.debug(`Element tagname: [${element.tagName}]`);
    const attributes = element.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        console.debug(`     ${attr.nodeName}: ${attr.nodeValue}`);
    }

    switch (element.tagName.toLowerCase()) {
        case 'xs:element':
            partialEJS += elementDetail(resourceType, element);
            break;
        case 'xs:choice':
            partialEJS += choiceDetail(resourceType, element);
            break;
        default:
            throw `Unahndled element ${element.tagName}'`;
    }

});

partialEJS +=
    `</form>
    <div>`;

await writeFile(myparameters.outputFilename, partialEJS);
/*
await fs.promises.writeFile(myparameters.outputFilename, partialEJS, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        throw err; // Throw the error to handle it appropriately
    };
    console.log('File has been written successfully. ***');
});
*/
//console.log('The end *********************************************************************');

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