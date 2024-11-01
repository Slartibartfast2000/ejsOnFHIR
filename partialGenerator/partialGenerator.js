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
    var type = 'a';
    var html = '';

    const attributes = element.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        console.debug(`     ${attr.nodeName}: ${attr.nodeValue}`);
        tooltip += `${attr.nodeName}: ${attr.nodeValue}  `;
        if (attr.nodeName === 'type') type = attr.nodeValue;

    }

    switch (type) {
        case 'Reference':
            html = `<div class="form-group">` + crlf;
            html += `<label for='${type}.${name}'>${name}</label>` + crlf;
            html += `<input type='text' id='${resourceType}.${name}' name='${name}[reference]' title='${tooltip}'
                        value="<%= data && data.${name} ? data.${name}.reference : '' %>">${type}</input>
            </div>` + crlf;
            console.debug(html);
            break;

        case 'HumanName':
            html = `<div class="form-group">` + crlf;
            html += `   <label for='${type}.${name}'>${name}.given</label>` + crlf;
            html += `   <input type='text' id='${resourceType}.${name}' name='${name}[given]' title='${tooltip}'
                          value="<%= data && data.${name} ? data.${name}[0].given : '' %>">${type}</input>

                         <label for='${type}.${name}'>${name}.family</label>
                         <input type='text' id='${resourceType}.${name}' name='${name}[family]' title='${tooltip}'
                           value="<%= data && data.${name} ? data.${name}[0].family : '' %>">${type}</input>
                    </div>` + crlf;
            console.debug(html);
            break;
       
        
        default:
            html = `<div class="form-group">` + crlf;
            html += `<label for='${type}.${name}'>${name}</label>` + crlf;
            html += `<input type='text' id='${resourceType}.${name}' name='${name}' title='${tooltip}'
                value="<%= data && data.${name} ? data.${name} : '' %>">${type}
                </div>` + crlf;
    }

    return html;

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
            tooltip += `${attr.nodeName}: ${attr.nodeValue}`;
        }
        const name = element.getAttribute('name');
        newElement += `<div class='form-group'>` + crlf;
        newElement += `<label for='${type}.${name}'>${name}*</label>` + crlf;
        newElement += `<input type='text' id='${type}.${name}' name='${name}'></div>` + crlf;
        newElement += `<title='${tooltip}'></title>`;
    });

    return newElement;
}


function createXPathEvaluator() {
    const select = xpath.useNamespaces({
        xs: 'http://www.w3.org/2001/XMLSchema'
    });
    return select;
}

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

const resourceType = myparameters.resourceType;

const xpathQuery = `//xs:complexType[@name="${resourceType}"]/xs:complexContent/xs:extension/xs:sequence/*`;

const elements = runXPathQuery(parsedData, xpathQuery);

let partialEJS =
    `<div>
        <form id="${resourceType}">
        <h3>${resourceType} Resource:</h3>
        <label for='${resourceType}.id'>id</label>
        <input type="text" readonly id="${resourceType}.id" name="id"
                value="<%= data && data.id ? data.id : '0' %>"></input>
        <label for='${resourceType}.resourceType'>id</label>
        <input type="text" readonly id="${resourceType}.resourceType" name="resourceType" 
                value="<%= data && data.resourceType ? data.resourceType : '${resourceType}' %>"></input>
    `;


elements.forEach((element) => {
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
    `   <button type="submit" id="saveResourceButton" name="saveResourceButton">Save Resource</button>
        </form>

    <div>`;

await writeFile(myparameters.outputFilename, partialEJS);

//process.exit(0);

