// pages/SeedDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Row, Col, Button, Breadcrumb, Image, Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSeeds } from '../context/SeedsContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SeedDetail = () => {
  const { seedId } = useParams();
  const { seeds } = useSeeds();
  const { addToCart } = useCart();
  const { currentUser, isBuyer } = useAuth();

  const [seed, setSeed] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = seeds.find(s => s.id === seedId);
    if (found) setSeed(found);
    setLoading(false);
  }, [seedId, seeds]);

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please login to add items to cart');
    } else if (!isBuyer()) {
      alert('Only buyers can add items to cart');
    } else {
      const success = addToCart(seed, quantity);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0 && val <= seed.stock) setQuantity(val);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </Container>
    );
  }

  if (!seed) {
    return (
      <Container className="py-5 text-center">
        <h2>Seed Not Found</h2>
        <p>Sorry, the seed you're looking for doesn't exist.</p>
        <Link to="/seeds">
          <Button variant="success">Browse Seeds</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/seeds" }}>Seeds</Breadcrumb.Item>
        <Breadcrumb.Item active>{seed.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Seed Details */}
      <Row className="mb-5">
        <Col md={5} className="mb-4">
          <Image
            src={seed.imageUrl}
            alt={seed.name}
            fluid
            className="rounded shadow-sm"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>

        <Col md={7}>
          <h1 className="fw-bold mb-2">{seed.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="text-muted">Sold by: </span>
            <Link to={`/seller/${seed.sellerId}`} className="ms-2 text-decoration-none">
              {seed.sellerName}
            </Link>
          </div>

          <div className="fs-3 fw-bold text-success mb-3">₹{seed.price}</div>
          <p className="text-muted mb-4">{seed.description}</p>

          <div className="mb-4">
            <strong>Care Instructions:</strong>
            <p className="text-muted">{seed.careInstructions}</p>
          </div>

          <div className="mb-4">
            <span>Stock: {seed.stock} available</span>
          </div>

          <Row className="align-items-center mb-4">
            <Col xs={5} sm={3}>
              <Form.Label className="mb-0">Quantity:</Form.Label>
            </Col>
            <Col xs={7} sm={4}>
              <Form.Control
                type="number"
                min="1"
                max={seed.stock}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={8} md={6}>
              <Button
                variant="success"
                className="w-100 py-2"
                onClick={handleAddToCart}
                disabled={addedToCart || seed.stock === 0}
              >
                {addedToCart ? 'Added to Cart!' : seed.stock === 0 ? 'Out of Stock' : (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SeedDetail;
