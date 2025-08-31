import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Row, Col, Button, Breadcrumb, Image, Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { usePlantCare } from '../context/PlantCareContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PlantCareDetail = () => {
  const { itemId } = useParams();
  const { plantCareItems } = usePlantCare();
  const { addToCart } = useCart();
  const { currentUser, isBuyer } = useAuth();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = plantCareItems.find(p => p.id === itemId);
    if (found) setItem(found);
    setLoading(false);
  }, [itemId, plantCareItems]);

  const handleAddToCart = () => {
    console.log("::::>s",isBuyer())
    if (!currentUser) {
      alert('Please login to add items to cart');
    } else if (!isBuyer()) {
      alert('Only buyers can add items to cart');
    } else {
      const success = addToCart(item, quantity);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0 && val <= item.stock) setQuantity(val);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <h2>Product Not Found</h2>
        <p>Sorry, the item you're looking for doesn't exist.</p>
        <Link to="/plantcare">
          <Button variant="success">Browse Plant Care</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/plantcare" }}>Plant Care</Breadcrumb.Item>
        <Breadcrumb.Item active>{item.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-5">
        <Col md={5}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            fluid
            className="rounded shadow-sm"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>

        <Col md={7}>
          <h1 className="fw-bold mb-2">{item.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="text-muted">Sold by: </span>
            <Link to={`/seller/${item.sellerId}`} className="ms-2 text-decoration-none">
              {item.sellerName}
            </Link>
          </div>

          <div className="fs-3 fw-bold text-success mb-3">₹{item.price}</div>
          <p className="text-muted mb-4">{item.description}</p>

          <div className="mb-4">
            <strong>Care Instructions:</strong>
            <p className="text-muted">{item.careInstructions}</p>
          </div>

          <div className="mb-4">
            <span>Stock: {item.stock} available</span>
          </div>

          <Row className="align-items-center mb-4">
            <Col xs={5} sm={3}>
              <Form.Label className="mb-0">Quantity:</Form.Label>
            </Col>
            <Col xs={7} sm={4}>
              <Form.Control
                type="number"
                min="1"
                max={item.stock}
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
                onClick={() => handleAddToCart()}
                disabled={addedToCart || item.stock === 0}
              >
                {addedToCart ? 'Added to Cart!' : item.stock === 0 ? 'Out of Stock' : (
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

export default PlantCareDetail;
