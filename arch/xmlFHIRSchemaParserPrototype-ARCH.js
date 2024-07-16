var xpath = require('xpath');
var dom = require('@xmldom/xmldom').DOMParser;
var fs = require('fs');

// Read XML from file
var xml = fs.readFileSync('FHIR/Patient.schema.xml', 'utf8');

var doc = new dom().parseFromString(xml, 'text/xml');

// Select all elements in the document
var elements = xpath.select("//*", doc);

// Loop through each element
elements.forEach(function(element) {
    console.log("Element Name: " + element.localName);
    
    // Check if the element has attributes
    if (element.attributes) {
        // Loop through each attribute
        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            console.log("Attribute Name: " + attribute.name + ", Value: " + attribute.value);
        }
    }
});


