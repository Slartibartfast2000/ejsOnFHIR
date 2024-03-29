
function processArgs(args) {

    argcount = 2; // start at two 
    myparameters = {
        outputFilename: "./src/views/myHTML.html",
        outputType: "html",
        xmlFilePath: "FHIR/Patient.schema.xml",
        formUrl: "/",
        script: "/",
    };


    while (true) {
        if (!process.argv[argcount]) break;
        // console.debug("arg[" + argcount + "] = " , process.argv[argcount]);

        const firstTwoChars = process.argv[argcount].substring(0, 2);

        switch (firstTwoChars) {
            case "-o":
                myparameters.outputFilename = process.argv[argcount + 1];
                argcount++;
                break;
            case "-t":
                myparameters.outputType = process.argv[argcount + 1];
                argcount++;
                break;
            case "-s":
                myparameters.xmlFilePath = process.argv[argcount + 1];
                argcount++;
                break;
            case "-u":
                myparameters.formUrl = process.argv[argcount + 1];
                argcount++;
                break;
            default:
                break;
        }
        argcount++;
    }

    console.debug("Command line options: ");
    for (const key in myparameters) {
    if (myparameters.hasOwnProperty(key)) {
        console.log(`${key}: ${myparameters[key]}`);
    }
}
    return myparameters;

}

module.exports = { processArgs };
