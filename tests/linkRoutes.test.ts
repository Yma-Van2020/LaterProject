import request from 'supertest';
import express from 'express';
import router from '../src/routes/linkRoutes'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/api', router);

describe('URL Append Parameters API', () => {
  beforeAll(async () => {
    // Clear the database before starting the tests
    await prisma.link.deleteMany();
  });

  afterAll(async () => {
    // Clean up and close the Prisma Client connection after the tests
    await prisma.$disconnect();
  });

  describe('POST /api/append-parameters', () => {
    it('should append parameters to the URL and save it in the database', async () => {
      const response = await request(app)
        .post('/api/append-parameters')
        .send({
          url: 'http://example.com',
          parameters: { foo: 'bar', baz: 'qux'},
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('original', 'http://example.com');
      expect(response.body).toHaveProperty('parameters');
      expect(response.body).toHaveProperty('newUrl', 'http://example.com/?foo=bar&baz=qux');

      // Verify the link was saved in the database
      const links = await prisma.link.findMany();
      expect(links.length).toBe(1);
      expect(links[0].original).toBe('http://example.com');
      expect(links[0].newUrl).toBe('http://example.com/?foo=bar&baz=qux');
    });
  });
  
  describe('GET /api/links', () => {
    it('should retrieve paginated links', async () => {
      // Insert a link directly into the database for testing
      await prisma.link.create({
        data: {
          original: 'http://example.com',
          parameters: JSON.stringify({ foo: 'bar' }),
          newUrl: 'http://example.com/?foo=bar',
        },
      });
  
      const response = await request(app).get('/api/links?page=1&limit=5');
      console.log(response)
      expect(response.status).toBe(200);
      expect(response.body.links.length).toBeGreaterThan(0);
      expect(response.body.links[0]).toHaveProperty('original', 'http://example.com');
      expect(response.body.links[0]).toHaveProperty('newUrl', 'http://example.com/?foo=bar');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 5);
    });
  
  });
});
