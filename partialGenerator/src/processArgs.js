
function processArgs(args) {

    let argcount = 2; // start at two 
    let myparameters = {
        outputFilename: "c:/inchware/vscode/uni/ejsOnFHIR/web-server/views/dynamicPartials/Encounter.ejs",
        resourceType: "Encounter",
        xsdFilePath: "c:/inchware/vscode/uni/ejsOnFHIR/partialGenerator/FHIR/fhir-single.xsd",
        xsdFilePathold: "partialGenerator/",
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
                myparameters.resourceType = process.argv[argcount + 1];
                argcount++;
                break;
            case "-s":
                myparameters.xsdFilePath = process.argv[argcount + 1];
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

export default processArgs;

