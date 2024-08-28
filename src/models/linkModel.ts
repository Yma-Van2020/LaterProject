import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Creates a new link entry in the database.
 * @param url - The original URL.
 * @param parameters - The custom parameters to be appended.
 * @param newUrl - The new URL with parameters appended.
 * @returns The created link object.
 */
export const createLink = async (url: string, parameters: object, newUrl: string) => {
  try {
    const parametersString = JSON.stringify(parameters); // Serialize parameters to a string
    const link = await prisma.link.create({
      data: {
        original: url,
        parameters: parametersString, // Store the serialized string
        newUrl: newUrl,
      },
    });
    return link;
  } catch (error: any) {
    throw new Error('Failed to create link:22 ' + error.message);
  }
};

/**
 * Retrieves all link entries from the database.
 * @returns An array of link objects.
 */
export const getAllLinks = async () => {
  try {
    const links = await prisma.link.findMany();
    return links.map((link: { parameters: string; }) => ({
      ...link,
      parameters: JSON.parse(link.parameters) // Deserialize the parameters
    }));
  } catch (error: any) {
    throw new Error('Failed to retrieve links: ' + error.message);
  }
};
