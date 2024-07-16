// Importing the necessary modules
import express from 'express';
import { buildMenuFromFiles } from '../utilities/io.js';

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

router.get('/index', (req, res) => {

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
// index.mjs

const directoryPath = './views/dynamicPartials'; // Replace with your directory path

let submenu = [];

(async () => {
  try {
      submenu = await buildMenuFromFiles(directoryPath);
      console.log(submenu);
  } catch (err) {
      console.error('Error:', err);
  }
})();

let navbarItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { submenu: submenu},
  { name: 'Contact', link: '/contact' }
];
console.debug(navbarItems);

/*
const navbarItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    {
        name: 'Resources',
        submenu: submenu,
    },
    { name: 'Contact', link: '/contact' }
];
*/
  console.debug('app.js: get/index - render patientSearch page'); 

  res.render('./pages/index', { entry: data.entry, navbarItems });
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
