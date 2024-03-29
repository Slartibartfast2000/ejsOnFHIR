var xpath = require('xpath');
var dom = require('@xmldom/xmldom').DOMParser;
var fs = require('fs');

function parseXML(filePath) {
    var xml = fs.readFileSync(filePath, 'utf8');
    var doc = new dom().parseFromString(xml, 'text/xml');
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
module.exports = parseXML;


