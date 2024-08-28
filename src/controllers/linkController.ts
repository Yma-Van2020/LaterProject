import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateURL, validateParameters } from '../utils/validation';

const prisma = new PrismaClient();

export const appendParameters = async (req: Request, res: Response) => {
  const { url, parameters } = req.body;

  if (!validateURL(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (!validateParameters(parameters)) {
    return res.status(400).json({ error: 'Invalid parameters. Ensure parameters is a valid JSON object.' });
  }

  const queryString = new URLSearchParams(parameters).toString();
  const separator = url.includes('?') ? '&' : '?';
  const newUrl = `${url}${separator}${queryString}`;

  try {
    const link = await prisma.link.create({
      data: {
        original: url,
        parameters: parameters,
        newUrl: newUrl,
      },
    });

    res.json({
      originalURL: url,
      parameters: parameters,
      newURL: newUrl,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to persist URL' });
  }
};

export const getLinks = async (req: Request, res: Response) => {
  try {
    const links = await prisma.link.findMany();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve links' });
  }
};
