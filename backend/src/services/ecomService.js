const axios = require('axios');
const env=require('dotenv');

const AUTH_TOKEN = process.env.BEARER_TOKEN;

// Base URL of the test server
const BASE_URL = 'http://20.244.56.144/test/companies';

async function getProducts(company, category, top, minPrice, maxPrice) {
  try {
    const response = await axios.get(`${BASE_URL}/${company}/categories/${category}/products`, {
      params: {
        top,
        minPrice,
        maxPrice
      },
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`, 
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products from ${company}:`, error);
    throw new Error('Failed to fetch products');
  }
}

module.exports = { getProducts };
