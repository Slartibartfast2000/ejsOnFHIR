const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the HTML form
app.get('/', (req, res) => {
    // Sample data for the form
    const formData = {
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        address: ''
    };
    res.render('chatGptPatient', formData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
