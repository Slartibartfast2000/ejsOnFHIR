import express from 'express';
import { searchResource } from '../controllers/searchController.js';

const router = express.Router();

router.get('/Patient?', searchResource);

export default router;
