const express = require('express');
const path = require('path');
const fs = require('fs');
var patient = require('./patient');
const patientRoute = require('./routes/patientRoute');
const fhirRoute = require('./routes/fhirRoute');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

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
        message: 'Patient data received successfully',
        data: patientData
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
