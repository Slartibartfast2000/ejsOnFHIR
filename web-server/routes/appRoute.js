// Importing the necessary modules
import express from 'express';
const router = express.Router();
import appController  from '../controllers/appController.js'; // Make sure to include the .js extension
import  patientRoute  from './patientRoute.js';
import authenticateJWT from '../utilities/authJWT.js'; // Import your middleware

// Creating a new router instance
 
// Defining a route that uses the getApp method from appController
router.get("/", authenticateJWT, (req, res) => { 

    console.debug("waaaa?");
    res.send('Hello from appRoute!"');
});

router.get("/patientform", patientRoute);

//app.use('/patientform', patientRoute);

//app.get('/', (req, res) => {
 //   res.send('Welcome to my Express app!');
 // });
// Exporting the router as the default export
export { router as appRoute };
