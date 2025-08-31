import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSeeds } from '../../context/SeedsContext';

const SeedForm = () => {
  const { currentUser, isSeller } = useAuth();
  const { getSeed, addSeed, updateSeed } = useSeeds();
  const { seedId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!seedId;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    plantingInstructions: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Vegetable Seeds',
    'Fruit Seeds',
    'Flower Seeds',
    'Herb Seeds',
    'Tree Seeds',
    'Organic Seeds',
    'Hybrid Seeds'
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1582281298051-fcb0ebf3d6c7',
    'https://images.unsplash.com/photo-1611077543884-7d3cb6fc54e3',
    'https://images.unsplash.com/photo-1615903955096-5411e6c6b6ed',
    'https://images.unsplash.com/photo-1518972559570-7cc1309f3229'
  ];

  useEffect(() => {
    if (!currentUser || !isSeller()) {
      navigate('/login');
      return;
    }

    if (isEditMode) {
      const seedData = getSeed(seedId);

      if (seedData && seedData.sellerId === currentUser.id) {
        setFormData({
          name: seedData.name || '',
          category: seedData.category || '',
          price: seedData.price || '',
          stock: seedData.stock || '',
          description: seedData.description || '',
          plantingInstructions: seedData.plantingInstructions || '',
          imageUrl: seedData.imageUrl || ''
        });
      } else {
        navigate('/seller/dashboard');
      }
    }
  }, [currentUser, isSeller, isEditMode, seedId, getSeed, navigate]);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = 'Seed name is required';
      isValid = false;
    }

    if (!formData.category) {
      tempErrors.category = 'Category is required';
      isValid = false;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      tempErrors.price = 'Valid price is required';
      isValid = false;
    }

    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) {
      tempErrors.stock = 'Stock must be a non-negative number';
      isValid = false;
    }

    if (!formData.description) {
      tempErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.imageUrl) {
      tempErrors.imageUrl = 'Image is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageSelect = (imageUrl) => {
    setFormData(prev => ({ ...prev, imageUrl }));

    if (errors.imageUrl) {
      setErrors(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      const seedData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sellerId: currentUser.id,
        sellerName: currentUser.name
      };

      if (isEditMode) {
        updateSeed(seedId, seedData);
      } else {
        addSeed(seedData);
      }

      setSuccess(true);
      window.scrollTo(0, 0);

      setTimeout(() => {
        navigate('/seller/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error saving seed:', error);
      setErrors({ form: 'Failed to save seed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-4">
            <Link to="/seller/dashboard" className="me-3 text-decoration-none text-muted">
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Link>
            <h1 className="fw-bold mb-0">{isEditMode ? 'Edit Seed' : 'Add New Seed'}</h1>
          </div>

          {success && (
            <Alert variant="success" className="mb-4">
              Seed {isEditMode ? 'updated' : 'added'} successfully! Redirecting...
            </Alert>
          )}

          {errors.form && (
            <Alert variant="danger" className="mb-4">
              {errors.form}
            </Alert>
          )}

          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <h5 className="mb-3">Seed Details</h5>

                    <Form.Group className="mb-3">
                      <Form.Label>Seed Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category*</Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price (₹)*</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            isInvalid={!!errors.price}
                          />
                          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Stock*</Form.Label>
                          <Form.Control
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            isInvalid={!!errors.stock}
                          />
                          <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Planting Instructions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="plantingInstructions"
                        value={formData.plantingInstructions}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  {/* Image Section */}
                  <Col md={4}>
                    <h5 className="mb-3">Seed Image</h5>

                    <div className="mb-3">
                      {formData.imageUrl ? (
                        <div className="position-relative">
                          <img src={formData.imageUrl} alt="Selected" className="img-thumbnail w-100 mb-3" style={{ height: '200px', objectFit: 'cover' }} />
                          <Button variant="light" size="sm" className="position-absolute top-0 end-0 m-2" onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}>×</Button>
                        </div>
                      ) : (
                        <div className="border rounded text-center p-5 mb-3">
                          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted mb-2" />
                          <p className="text-muted mb-0">Select an image below</p>
                        </div>
                      )}
                      {errors.imageUrl && <div className="text-danger">{errors.imageUrl}</div>}
                    </div>

                    <div className="mb-3">
                      <p className="text-muted small">Sample images:</p>
                      <Row className="g-2">
                        {sampleImages.map((url, index) => (
                          <Col xs={6} key={index}>
                            <div
                              className={`border rounded ${formData.imageUrl === url ? 'border-success border-2' : ''}`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleImageSelect(url)}
                            >
                              <img src={url} alt={`Sample ${index + 1}`} className="img-fluid rounded" style={{ height: '80px', objectFit: 'cover' }} />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 d-flex justify-content-end">
                  <Link to="/seller/dashboard" className="btn btn-outline-secondary me-2">Cancel</Link>
                  <Button type="submit" variant="success" disabled={loading}>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    {loading ? 'Saving...' : 'Save Seed'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SeedForm;