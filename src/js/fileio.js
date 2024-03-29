const fs = require('fs');

function writeToFile(filePath, data, callback) {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null); // Signal success
    });
}


function readFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, data); // Pass the data read from the file to the callback
    });
}

module.exports = { writeToFile, readFromFile };
