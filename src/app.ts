import express from 'express';
import bodyParser from 'body-parser';
import linkRoutes from './routes/linkRoutes';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (like HTML) from the 'views' directory
app.use(express.static('src/views'));

// Use routes defined in linkRoutes
app.use('/api', linkRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
