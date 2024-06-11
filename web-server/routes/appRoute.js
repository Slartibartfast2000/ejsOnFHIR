// Importing the necessary modules
import express from 'express';
import { getApp } from '../controllers/appController.js'; // Make sure to include the .js extension

// Creating a new router instance
const router = express.Router();

// Defining a route that uses the getApp method from appController
router.get("/", getApp);

// Exporting the router as the default export
export default router;
