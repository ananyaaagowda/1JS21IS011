const express = require('express');
const { getProducts } = require('../services/ecomService');
const uuid = require('uuid');
const router = express.Router();

// Helper function to generate unique product IDs
function generateProductId(product, index) {
  return uuid.v4();
}

// Helper function to sort products based on query parameters
function sortProducts(products, sortBy, order) {
  return products.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
}

// GET /categories/:categoryname/products
router.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const top = parseInt(req.query.top) || 10;
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
  const page = parseInt(req.query.page) || 1;
  const sortBy = req.query.sortBy || 'rating';
  const order = req.query.order || 'desc';

  try {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    const allProducts = [];

    for (const company of companies) {
      const products = await getProducts(company, categoryname, top * page, minPrice, maxPrice);
      allProducts.push(...products);
    }

    // Remove duplicate products by productName (if needed)
    const uniqueProducts = Array.from(new Set(allProducts.map(p => p.productName)))
      .map(name => allProducts.find(p => p.productName === name));

    // Sort products
    const sortedProducts = sortProducts(uniqueProducts, sortBy, order);

    // Pagination
    const paginatedProducts = sortedProducts.slice((page - 1) * top, page * top);

    // Add unique IDs
    const response = paginatedProducts.map((product, index) => ({
      id: generateProductId(product, index),
      ...product
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/categories/:categoryname/products/:productid', (req, res) => {
  const { productid } = req.params;
  res.json({ message: `Details for product ${productid}` });
});

module.exports = router;
