const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const validateProduct = require('../middleware/validateProduct');
const NotFoundError = require('../errors/NotFoundError');

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

// POST /api/products - Create a new product
router.post('/', validateProduct, (req, res) => {
  // ...existing code...
});

// PUT /api/products/:id - Update a product
router.put('/:id', validateProduct, (req, res) => {
});

// GET /api/products - Retrieve products with optional category filter and pagination
router.get('/', (req, res) => {
  let result = products;
  const { category, page = 1, limit = 10 } = req.query;

  if (category) {
    result = result.filter(p => p.category === category);
  }
  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(result.slice(start, end));
});

// GET /api/products/search - Search for products by name
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Name query required' });
  const result = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(result);
});

// GET /api/products/stats - Get product statistics by category
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

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