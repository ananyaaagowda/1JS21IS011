import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{product.name}</Typography>
      <Typography>{product.company}</Typography>
      <Typography>{product.category}</Typography>
      <Typography>${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
      <Typography>Discount: {product.discount}%</Typography>
      <Typography>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
    </CardContent>
  </Card>
);

export default ProductCard;
