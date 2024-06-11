import express from 'express';
import { getResource } from '../controllers/fhirController.js';

const router = express.Router();

router.get('/:resourceType/:id', getResource);

export default router;
