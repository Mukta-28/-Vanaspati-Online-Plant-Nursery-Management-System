import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext'; 

const PlantForm = () => {
  const { currentUser, isSeller } = useAuth();
  const { getPlant, addProduct, updatePlant } = useProducts();
  
  const { plantId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!plantId;

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'PLANT',
    'SEED',
    'POT_AND_PLANTER',
    'PLANTCARE'
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1587049352846-c9ef1a251c8b',
    'https://images.unsplash.com/photo-1606813904956-2873a5be0ee5',
    'https://images.unsplash.com/photo-1616627982305-c5b44374d6df',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6'
  ];

  useEffect(() => {
    if (!currentUser || !isSeller()) {
      navigate('/login');
      return;
    }

    if (isEditMode) {
      const plantData = getPlant(plantId);

      if (plantData && plantData.sellerId === currentUser.id) {
        setFormData({
          productName: plantData.name || '',
          category: plantData.category || '',
          price: plantData.price || '',
          stock: plantData.stock || '',
          description: plantData.description || '',
          sunlight: plantData.sunlight || '',
          watering: plantData.watering || '',
          imageUrl: plantData.imageUrl || ''
        });
      } else {
        navigate('/seller/dashboard');
      }
    }
  }, [currentUser, isSeller, isEditMode, plantId, getPlant, navigate]);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.productName) {
      tempErrors.productName = 'Plant name is required';
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

    if (!formData.image) {
      tempErrors.image = 'Image is required';
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
    setFormData(prev => ({ ...prev, image: imageUrl }));

    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      const plantData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sellerId: currentUser.id,
      };


      if (isEditMode) {
        updatePlant(plantId, plantData);
      } else {
        // Send POST request to backend API
        const response = await fetch('http://localhost:8080/api/plants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed, e.g.:
            // 'Authorization': `Bearer ${currentUser.token}`
          },
          body: JSON.stringify(plantData)
        });
        if (!response.ok) {
          throw new Error('Failed to add plant');
        }
      }

      setSuccess(true);
      window.scrollTo(0, 0);

      setTimeout(() => {
        navigate('/seller/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error saving plant:', error);
      setErrors({ form: 'Failed to save plant. Please try again.' });
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
            <h1 className="fw-bold mb-0">{isEditMode ? 'Edit Plant' : 'Add New Plant'}</h1>
          </div>

          {success && (
            <Alert variant="success" className="mb-4">
              Plant {isEditMode ? 'updated' : 'added'} successfully! Redirecting...
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
                    <h5 className="mb-3">Plant Details</h5>

                    <Form.Group className="mb-3">
                      <Form.Label>Plant Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        isInvalid={!!errors.productName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.productName}</Form.Control.Feedback>
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

                    {/* Sunlight and Watering fields removed to match ProductDTO */}
                  </Col>

                  <Col md={4}>

                    <h5 className="mb-3">Plant Image</h5>
                    <div className="mb-3">
                      {formData.image ? (
                        <div className="position-relative">
                          <img src={formData.image} alt="Selected" className="img-thumbnail w-100 mb-3" style={{ height: '200px', objectFit: 'cover' }} />
                          <Button variant="light" size="sm" className="position-absolute top-0 end-0 m-2" onClick={() => setFormData(prev => ({ ...prev, image: '' }))}>×</Button>
                        </div>
                      ) : (
                        <div className="border rounded text-center p-5 mb-3">
                          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted mb-2" />
                          <p className="text-muted mb-0">Select an image below</p>
                        </div>
                      )}
                      {errors.image && <div className="text-danger">{errors.image}</div>}
                    </div>

                    <div className="mb-3">
                      <p className="text-muted small">Sample images:</p>
                      <Row className="g-2">
                        {sampleImages.map((url, index) => (
                          <Col xs={6} key={index}>
                            <div
                              className={`border rounded ${formData.image === url ? 'border-success border-2' : ''}`}
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
                    {loading ? 'Saving...' : 'Save Plant'}
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

export default PlantForm;