import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Row, Col, Button, Breadcrumb, Image, Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { usePots } from '../context/PotsContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PotDetail = () => {
  const { potId } = useParams();
  const { pots } = usePots();
  const { addToCart } = useCart();
  const { currentUser, isBuyer } = useAuth();

  const [pot, setPot] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = pots.find(p => p.id === potId);
    if (found) setPot(found);
    setLoading(false);
  }, [potId, pots]);

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please login to add items to cart');
    } else if (!isBuyer()) {
      alert('Only buyers can add items to cart');
    } else {
      const success = addToCart(pot, quantity);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0 && val <= pot.stock) setQuantity(val);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </Container>
    );
  }

  if (!pot) {
    return (
      <Container className="py-5 text-center">
        <h2>Pot Not Found</h2>
        <p>Sorry, the pot you're looking for doesn't exist.</p>
        <Link to="/pots">
          <Button variant="success">Browse Pots</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/pots" }}>Pots</Breadcrumb.Item>
        <Breadcrumb.Item active>{pot.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-5">
        <Col md={5} className="mb-4">
          <Image
            src={pot.imageUrl}
            alt={pot.name}
            fluid
            className="rounded shadow-sm"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>

        <Col md={7}>
          <h1 className="fw-bold mb-2">{pot.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="text-muted">Sold by: </span>
            <Link to={`/seller/${pot.sellerId}`} className="ms-2 text-decoration-none">
              {pot.sellerName}
            </Link>
          </div>

          <div className="fs-3 fw-bold text-success mb-3">₹{pot.price}</div>
          <p className="text-muted mb-4">{pot.description}</p>

          <div className="mb-4">
            <strong>Care Instructions:</strong>
            <p className="text-muted">{pot.careInstructions}</p>
          </div>

          <div className="mb-4">
            <span>Stock: {pot.stock} available</span>
          </div>

          <Row className="align-items-center mb-4">
            <Col xs={5} sm={3}>
              <Form.Label className="mb-0">Quantity:</Form.Label>
            </Col>
            <Col xs={7} sm={4}>
              <Form.Control
                type="number"
                min="1"
                max={pot.stock}
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
                disabled={addedToCart || pot.stock === 0}
              >
                {addedToCart ? 'Added to Cart!' : pot.stock === 0 ? 'Out of Stock' : (
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

export default PotDetail;
