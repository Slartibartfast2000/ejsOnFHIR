const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// Route to render the HTML form
app.get('/', (req, res) => {
    // Sample data for the form
    var Patient = {
        firstName: 'myFirstName',
        lastName: 'myLastName',
        gender: 'myGender',
        birthDate: '1980-02-28',
        address: 'myAddress'
    };
    //res.render('eh', viewData );
    res.render('pages/index',  { Patient } );
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
