var xpath = require('xpath');
var dom = require('@xmldom/xmldom').DOMParser;
var fs = require('fs');

// Read XML from file
var xml = fs.readFileSync('FHIR/Patient.schema.xml', 'utf8');

var doc = new dom().parseFromString(xml, 'text/xml');

var nodes = xpath.select("/", doc);

console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
console.log("Node: " + nodes[0].toString());

