import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { usePlantCare } from '../../context/PlantCareContext';

const PlantCareForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fertilizer',
    description: '',
    price: '',
    image: ''
  });

  const [message, setMessage] = useState('');
  const { addPlantCareItem } = usePlantCare();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlantCareItem(formData);
    setMessage('Plant Care item added successfully!');
    setFormData({
      name: '',
      category: 'Fertilizer',
      description: '',
      price: '',
      image: ''
    });

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <h2 className="mb-4 text-center">Add Plant Care Item</h2>
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="category" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pesticide">Pesticide</option>
                  <option value="Tools">Tools</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Form.Group>

              {formData.image && (
                <div className="mb-3 text-center">
                  <img
                    src={formData.image}
                    alt="Preview"
                    height="150"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}

              <Button type="submit" variant="success" className="w-100">
                Add Item
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlantCareForm;