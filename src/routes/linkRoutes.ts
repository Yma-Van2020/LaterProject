import express from 'express';
import { createLink, getAllLinks } from '../models/linkModel';

const router = express.Router();

/**
 * POST /api/append-parameters
 * Accepts a URL and parameters, then returns the URL with appended parameters.
 */
router.post('/append-parameters', async (req, res) => {
  const { url, parameters } = req.body;
  if (typeof url !== 'string' || typeof parameters !== 'object') {
    return res.status(400).json({ error: 'Invalid URL. Please correct before proceeding' });
  }

  try {
    // Create the new URL with parameters appended
    const newUrl = new URL(url);
    Object.entries(parameters).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value as string);
    });

    const link = await createLink(url, parameters, newUrl.toString());
    res.status(201).json({
      original: url,
      parameters,
      newUrl: newUrl.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error appending parameters' });
  }
});

/**
 * GET /api/links
 * Retrieves all persisted links.
 */
router.get('/links', async (req, res) => {
  try {
    const links = await getAllLinks();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve links' });
  }
});

export default router;
