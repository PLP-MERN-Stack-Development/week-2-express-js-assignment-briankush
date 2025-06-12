// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// In-memory products database (for demo purposes)
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// API routes
const productRouter = express.Router();

// GET /api/products - Get all products
productRouter.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
productRouter.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Create a new product
productRouter.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
productRouter.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const { name, description, price, category, inStock } = req.body;
  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    description: description ?? products[index].description,
    price: price ?? products[index].price,
    category: category ?? products[index].category,
    inStock: inStock ?? products[index].inStock
  };
  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
productRouter.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

app.use('/api/products', productRouter);

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;