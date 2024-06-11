import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//const fhirRoute = require('./routes/fhirRoute');

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

import fhirRoute from './routes/fhirRoute.js';

/* Configuration */
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the view engine - // Set the directory for views
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Static files from the ./public directory and 
app.use(express.static(join(__dirname, 'public')));

// css - version can be controlled via npm and package.json - also doesn't require breakout to internet to download Content Delivery Network stylesheets from private networks)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Main application entry
app.use('/', appRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*
app.use('/fhir', fhirRoute);
*/
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


