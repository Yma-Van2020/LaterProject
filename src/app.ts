import express from 'express';
import bodyParser from 'body-parser';
import linkRoutes from './routes/linkRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML) from the 'views' directory
app.use(express.static('src/views'));

// Use routes defined in linkRoutes
app.use('/api', linkRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
