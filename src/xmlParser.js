import xpath from 'xpath';
//import parseXMLSchema from './xmlParser.js';
import { DOMParser } from '@xmldom/xmldom';

//var dom = require('@xmldom/xmldom').DOMParser;
import fs from 'fs';

function parseXML(filePath) {

    var xml = fs.readFileSync(filePath, 'utf8');
    const parser = new DOMParser();

    var doc = parser.parseFromString(xml, 'text/xml');
    var elements = xpath.select("//*", doc);

    var result = {};

    elements.forEach(function(element) {
        var elementName = element.localName;
        var attributes = {};

        if (element.attributes) {
            for (var i = 0; i < element.attributes.length; i++) {
                var attribute = element.attributes[i];
                attributes[attribute.name] = attribute.value;
            }
        }

        // Add the element and its attributes to the result object
        result[elementName] = attributes;
    });

    return result;
}
export default parseXML;

//module.exports = parseXML;


