// Importing the necessary modules
import express from 'express';
const router = express.Router();
import appController  from '../controllers/appController.js'; // Make sure to include the .js extension
import users from '../utilities/users.js'; // Import the users array from the separate file
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import authenticateJWT from '../utilities/authJWT.js'; // Import your middleware

import fhirRoute from './fhirRoute.js';
import  patientRoute  from './patientRoute.js';
import  searchRoute  from './searchRoute.js';


// Creating a new router instance
const secretKey = process.env.JWT_SECRET;
//router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use('/fhir', fhirRoute);
router.use('/patient', patientRoute);
router.use('/search', searchRoute);
// Defining a route that uses the getApp method from appController
router.get("/", authenticateJWT, (req, res) => { 

    console.debug("waaaa?");
    res.send('Hello from appRoute!"');
});



router.post('/register', async (req, res) => {
    console.debug(req.body);

    const { username, password } = req.body;
    console.debug(username, password);

    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
  
    const hashedPassword = await hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    console.debug("/register", username, password);
    res.status(201).send('User registered');
  });
//router.post('/register', async (req, res) => {
  //  await registerUser(req, res, users); // Pass the users array to the registerUser function
//});

router.get("/patientform", patientRoute);

//app.use('/patientform', patientRoute);

//app.get('/', (req, res) => {
 //   res.send('Welcome to my Express app!');
 // });
// Exporting the router as the default export
export { router as appRoute };
