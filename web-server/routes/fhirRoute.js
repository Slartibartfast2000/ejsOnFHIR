import express from 'express';

import { readResource, searchResource, updateResource, deleteResource } from '../controllers/fhirController.js';

const router = express.Router();

/* /fhir */
router.put('/Patient/:id', updateResource);

router.delete('/Patient/:id', deleteResource);

router.get('/:resourceType/:id', readResource);

router.get('/:resourceType?', searchResource);

export default router;
