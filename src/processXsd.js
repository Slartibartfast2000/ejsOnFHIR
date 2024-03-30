var xpath = require('xpath');
var dom = require('@xmldom/xmldom').DOMParser;
var fs = require('fs');
   
processSchema();

function processSchema()
{

    // Read XML from file
    var xml = fs.readFileSync('FHIR/fhir-base.xsd', 'utf8');
    
    var doc = new dom().parseFromString(xml, 'text/xml');
    const namespaces = {
        xs: 'http://www.w3.org/2001/XMLSchema'
    };
    const select = xpath.useNamespaces(namespaces);
    const elements = select("//xs:complexType[@name='ResourceContainer']//*", doc);

    // Select all elements in the document
  //  var elements = xpath.select("//xs:complexType[@name='ResourceContainer']", doc);
    
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

}