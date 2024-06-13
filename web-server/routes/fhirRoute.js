import express from 'express';
import { readResource, searchResource, updateResource } from '../controllers/fhirController.js';

const router = express.Router();

router.put('/Patient/:id', updateResource);

router.get('/:resourceType/:id', readResource);

router.get('/:resourceType?', searchResource);


export default router;
