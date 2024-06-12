import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import jsonwebtoken from 'jsonwebtoken';
const { verify, sign } = jsonwebtoken;
import bodyparser from 'body-parser';
const { json } = bodyparser;
import cookieParser from 'cookie-parser'; // Include cookie-parser
import authenticateJWT from './utilities/authJWT.js'; // Import your middleware
/* App routes */
import { appRoute } from './routes/appRoute.js';



//const users = []; // This should be replaced with a proper database in a real application
 
//const secretKey = 'your-secret-keys'; // Store this in an environment variable in a real application
//const secretKey = process.env.JWT_SECRET;

/* Configuration */
dotenv.config();
const PORT = process.env.PORT || 3000;
const USE_HTTPS = process.env.USE_HTTPS || false;
const CERT_FILE = process.env.CERT_FILE || './cert/mySelfSignedCert.pfx'

const options = {
    pfx: fs.readFileSync(CERT_FILE), // Path to your exported .pfx file
    passphrase: 'password' // Password used during export (if any)
};
 
const app = express();
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the view engine - // Set the directory for views
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Static files from the ./public directory and 
app.use('/static/', express.static(join(__dirname, 'public')));

// css - version can be controlled via npm and package.json - also doesn't require breakout to internet to download Content Delivery Network stylesheets from private networks)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const data = {
    entry: [
      {
        fullUrl: "http://localhost:8080/fhir/Patient/1",
        resource: {
          resourceType: "Patient",
          id: "1",
          name: [{ family: "Doe", given: ["John"] }],
          gender: "male",
          birthDate: "1970-01-01"
        }
      },
      {
        fullUrl: "http://localhost:8080/fhir/Patient/5",
        resource: {
          resourceType: "Patient",
          id: "5",
          name: [{ family: "Doe", given: ["John"] }],
          gender: "male",
          birthDate: "1982-01-01"
        }
      }
    ]
  };
  
app.get('/patientSearch', (req, res) => {
    console.debug('patientSearch'); 

    res.render('./pages/patientSearch', { entry: data.entry });
  });
// Main application entry
app.use('/', appRoute);


console.info("Using HTTPS?", USE_HTTPS);

if (USE_HTTPS == 'true') {

    // Start the server - run on any available ip
    https.createServer(options, app).listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}`);
    });
} else {

    const server = app.listen(PORT, '0.0.0.0', () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Server is running on http://${host}:${port}`);
    });

}


// Route to render the HTML form
/*
app.get('/Patient', async (req, res) => {
   // const patientData = await readJSONFile(path.join(__dirname, '../FHIR/data/Patient.json'));
   var obj = JSON.parse(fs.readFileSync('../FHIR/data/Patient.json', 'utf8')); 
   console.log('JSON Data:', obj);
   patient.foo();
   patient.bar();

    // Sample data for the form
    var Patient = {
        id: 'id',
        use: 'official',
        given: 'name.given',
        family: 'name.family',
        gender: 'myGender',
        birthDate: '1980-02-28',
        address: 'myAddress'
    };
  
    res.render('pages/index',  { Patient } );
});
*/

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


