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

module.exports = { writeToFile };
