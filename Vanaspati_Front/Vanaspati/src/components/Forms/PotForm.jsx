import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePots } from '../../context/PotsContext';

const PotForm = () => {
  const { potId } = useParams();
  const navigate = useNavigate();
  const { getPot, addPot, updatePot } = usePots();

  const isEdit = Boolean(potId);

  const [pot, setPot] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Pots',
    stock: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existingPot = getPot(potId);
      if (existingPot) {
        setPot(existingPot);
      }
    }
  }, [isEdit, potId, getPot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updatePot(potId, pot);
      setMessage('Pot updated successfully!');
    } else {
      const newId = 'p' + Date.now(); // simple ID generation
      addPot({ ...pot, id: newId });
      setMessage('Pot added successfully!');
    }

    setTimeout(() => {
      navigate('/dashboard'); // or wherever you want to redirect
    }, 1000);
  };

  return (
    <Card>
      <Card.Body>
        <h3>{isEdit ? 'Edit Pot Product' : 'Add New Pot Product'}</h3>
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={pot.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={pot.category}
              onChange={handleChange}
              required
            >
              <option value="Pots">Pots</option>
              <option value="Ceramic Pots">Ceramic Pots</option>
              <option value="Plastic Pots">Plastic Pots</option>
              <option value="Terracotta">Terracotta</option>
              <option value="Metal Pots">Metal Pots</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={pot.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={pot.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={pot.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={pot.imageUrl}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="success">
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PotForm;