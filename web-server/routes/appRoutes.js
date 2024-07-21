// Importing the necessary modules
import express from 'express';
import { buildMenuFromFiles } from '../utilities/io.js';

const router = express.Router();
//import appController  from '../controllers/appController.js'; // Make sure to include the .js extension
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

router.get('/index', async (req, res) => { // Make the handler asynchronous
  const directoryPath = './views/dynamicPartials';
  const data = {entry: []};
  /*
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
          }
      ]
  }; 
*/
  try {
      // Build the resources menu asynchronously
      const resourcesMenu = await buildMenuFromFiles(directoryPath);
     
      const navbarItems = [
          { name: 'Home', link: '/' },
          { name: 'Register', link: '#' },
          resourcesMenu,
          { name: 'Contact', link: '/contact' },
          { name: 'About', link: '/about' }
          
        ];

//      console.log(resourcesMenu); // Log the resources menu
  //    console.debug(navbarItems); // Log the navbar items

      console.debug('app.js: get/index - render patientSearch page');

      res.render('./pages/index', { entry: data.entry, navbarItems });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
  }
});

router.use('/fhir', fhirRoute);
router.use('/patient', patientRoute);
router.use('/search', searchRoute); // todo: move to patientroute?

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
