import express from 'express';
import {appendParameters, getLinks} from '../controllers/linkController';

const router = express.Router();

/**
 * POST /api/append-parameters
 * Accepts a URL and parameters, then returns the URL with appended parameters.
 */
router.post('/append-parameters', appendParameters);

/**
 * GET /api/links
 * Retrieves paginated link entries.
 * Query parameters: page, limit
 */
router.get('/links', getLinks);

export default router;
