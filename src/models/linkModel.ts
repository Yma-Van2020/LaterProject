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
    throw new Error('Failed to create link: ' + error.message);
  }
};

/**
 * Retrieves paginated link entries from the database.
 * @param page - The page number to retrieve.
 * @param limit - The number of items per page.
 * @returns A paginated array of link objects.
 */
export const getPaginatedLinks = async (page: number, limit: number) => {
  try {
    const skip = (page - 1) * limit;
    
    const [links, total] = await Promise.all([
      prisma.link.findMany({
        skip,
        take: limit,
      }),
      prisma.link.count(),
    ]);
    
    return { links: links.map((link: { parameters: string; }) => ({
      ...link,
      parameters: JSON.parse(link.parameters) // Deserialize the parameters
    })), total, page, limit };
  } catch (error: any) {
    throw new Error('Failed to retrieve links: ' + error.message);
  }
};

