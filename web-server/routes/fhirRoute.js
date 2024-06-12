import express from 'express';
import { readResource, searchResource } from '../controllers/fhirController.js';

const router = express.Router();

router.get('/:resourceType/:id', readResource);

router.get('/:resourceType?', searchResource);

export default router;
