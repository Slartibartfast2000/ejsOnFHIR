/* 
    main web server entry file
*/

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';
//import bcryptjs from 'bcryptjs';
//const { hash, compare } = bcryptjs;
import jsonwebtoken from 'jsonwebtoken';
//const { verify, sign } = jsonwebtoken;
import bodyparser from 'body-parser';
const { json } = bodyparser;
//import cookieParser from 'cookie-parser'; // Include cookie-parser
//import authenticateJWT from './utilities/authJWT.js'; // Import your middleware
/* App routes */
import { appRoute } from './routes/appRoutes.js';
import { checkFhirEndpoint } from './utilities/fhir.js';

import multer from 'multer';


//const secretKey = 'your-secret-keys'; - 
//const secretKey = process.env.JWT_SECRET;

/* Configuration */
dotenv.config();
const HOST_IP = process.env.HOST_IP || '0.0.0.0'; // default = listen on all interfaces - could be security risk any network device could connect.
const PORT = process.env.PORT || 3000;
const USE_HTTPS = process.env.USE_HTTPS || false;
const CERT_FILE = process.env.CERT_FILE || './cert/mySelfSignedCert.pfx';
const FHIR_BASE_URL = process.env.FHIR_BASE_URL || 'http://localhost:8080/fhir';
const options = {
    pfx: fs.readFileSync(CERT_FILE), // Path to your exported .pfx file
    passphrase: 'password' // Password used during export (if any)
};
  
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the view engine - 
// Set the directory for views
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Static files from the ./public directory
app.use('/static/', express.static(join(__dirname, 'public')));
 
// css - version can be controlled via npm and package.json - also doesn't require breakout to internet to download Content Delivery Network stylesheets from private networks)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// Main application entry
app.use('/', appRoute);

console.log('Environment Variables:');
console.log('PORT:', PORT );
console.log('HOST_IP:', HOST_IP );
console.log('USE_HTTPS:' , USE_HTTPS );
console.log('FHIR_BASE_URL:', FHIR_BASE_URL);

// On app start up, check FHIR endpoint is available and insert dummy data if missing
try {
    await checkFhirEndpoint();
} catch 
{ 
    console.error("Something wrong with Fhir Server: " );
}



console.info("Using HTTPS?", USE_HTTPS);

if (USE_HTTPS == 'true') {

    https.createServer(options, app).listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}`);
    });
} else {

    const server = app.listen(PORT, HOST_IP, () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Server is running on http://${host}:${port}/index`);
    });

}





/*
app.get('/complexForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'complexForm.html'));
});
*/

/*
app.post('/Patient', (req, res) => {
    const patientData = req.body;

    // Log the received data
    console.log('Received patient data:', patientData);

    // Send a response
    res.status(201).send({
        Patient: patientData
    });
});
*/
/*
function readJSONFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseErr) {
                    reject(parseErr);
                }
            }
        });
    });
}

*/
