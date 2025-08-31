import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container } from 'react-bootstrap';

const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = allProducts.find((p) => p.id === id);
    
    if (!selectedProduct) {
      alert('Product not found');
      navigate('/seller/dashboard');
      return;
    }

    setProduct(selectedProduct);
    setUpdatedProduct({
      name: selectedProduct.name || '',
      category: selectedProduct.category || '',
      price: selectedProduct.price || '',
      stock: selectedProduct.stock || '',
      description: selectedProduct.description || '',
      imageUrl: selectedProduct.imageUrl || '',
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleUpdate = () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedList = allProducts.map((p) =>
      p.id === id ? { ...p, ...updatedProduct } : p
    );
    localStorage.setItem('products', JSON.stringify(updatedList));
    alert('Product updated successfully!');
    navigate('/seller/dashboard');
  };

  if (!product) return null;

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-sm border-0">
        <h3 className="mb-4 text-center fw-bold">Edit Product</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product ID</Form.Label>
            <Form.Control type="text" value={product.id} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={updatedProduct.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={updatedProduct.imageUrl}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="button"
            className="w-100 fw-bold"
            onClick={handleUpdate}
          >
            Save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SellerEditProduct;
