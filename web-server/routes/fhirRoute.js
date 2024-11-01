import express from 'express';

import { readResource, searchResource, updateResource, deleteResource, renderResource } from '../controllers/fhirController.js';

const router = express.Router();

/* /fhir */
router.put('/:resourceType/:id', updateResource);

//router.put('/Patient/:id', updateResource);

router.delete('/Patient/:id', deleteResource);

router.get('/:resourceType/:id', readResource);

router.get('/:resourceType?', searchResource);

router.get('/RenderResource/:resourceType/:id', renderResource);

export default router;
