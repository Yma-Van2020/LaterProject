import { Request, Response } from 'express';
import { validateURL } from '../utils/validation';
import {createLink, getPaginatedLinks} from '../models/linkModel';

export const appendParameters = async (req: Request, res: Response) => {
  const { url, parameters } = req.body;

  if (!validateURL(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Create the new URL with parameters appended
    const newUrl = new URL(url);
    Object.entries(parameters).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value as string);
    });

    await createLink(url, parameters, newUrl.toString());
    res.status(201).json({
      original: url,
      parameters,
      newUrl: newUrl.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to persist URL' });
  }
};

export const getLinks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const { links, total } = await getPaginatedLinks(page, limit);
    res.status(200).json({
      total,
      page,
      limit,
      links
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve links' });
  }
};
