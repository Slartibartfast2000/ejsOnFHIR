const path = require('path');

const parseXML = require('./xmlParser'); // Assuming xmlParser.js is in the same directory
const fileIO = require('./js/fileio');

const xmlFilePath = 'FHIR/Patient.schema.xml'; // Provide the path to your XML file
const parsedData = parseXML(xmlFilePath);

console.log('First argument:', process.argv[2]);
console.log('Second argument:', process.argv[3]);

outputFilename = "./src/views/myHTML.html";
generate = "html";

if (!process.argv[2] )
{
    outputFilename = "./src/views/" + process.argv[2];    
}

console.log(process.argv[3]);

if (process.argv[3]==="partial")
{
    console.log(process.argv[3])
    generate="partial";    
    const dirname = path.dirname(outputFilename);
    const basename = path.basename(outputFilename, path.extname(outputFilename));

    // Concatenate the directory name, file name without extension, and new extension
    outputFilename = path.join(dirname, `${basename}.ejs`);

}
console.debug("Command line options: ");
console.log("outputFilename=", outputFilename);
console.log("generate=", generate);

const crlf = "\r\n";
const tab = "\t";

myPartialEJS= "";

myPartialEJS += "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>My HTML Page</title><style></style></head><body>" + crlf;

myPartialEJS += "<div><form><table>" + crlf + tab;

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

///const data = "hello";

fileIO.writeToFile(outputFilename, myPartialEJS, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File written successfully.');
});

console.log(myPartialEJS);