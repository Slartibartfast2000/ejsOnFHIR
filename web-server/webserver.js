//const path = require('path');
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
//const fs = require('fs');
//import patient from './patient.js';

import appRoute from './routes/appRoute.js';

//const appRoute = require('./routes/appRoute');
import patientRoute from './routes/appRoute.js';

//const patientRoute = require('./routes/patientRoute');

import fhirRoute from './routes/fhirRoute.js';

//const fhirRoute = require('./routes/fhirRoute');

import dotenv from 'dotenv';
import express from 'express';
//import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import jsonwebtoken from 'jsonwebtoken';
const { verify, sign } = jsonwebtoken;
import bodyparser from 'body-parser';
const { json } = bodyparser;
import cookieParser from 'cookie-parser'; // Include cookie-parser
//import { join, dirname } from 'path';
import authenticateJWT from './authJWT.js'; // Import your middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
//app.set('views', path.join(__dirname, 'views'));
app.set('views', join(__dirname, 'views'));
// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Main application entry
app.use('/app', appRoute);

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

app.use('/patientform', patientRoute);

app.use('/fhir', fhirRoute);

console.debug('fhir');

// Route to render the HTML form
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

app.get('/complexForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'complexForm.html'));
});

app.post('/Patient', (req, res) => {
    const patientData = req.body;

    // Log the received data
    console.log('Received patient data:', patientData);

    // Send a response
    res.status(201).send({
        Patient: patientData
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
