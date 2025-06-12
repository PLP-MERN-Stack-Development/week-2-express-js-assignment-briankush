const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Custom Middleware ---

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Simple authentication middleware
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth || auth !== 'Bearer mysecrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Middleware setup
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Use products router
app.use('/api/products', productsRouter);

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;