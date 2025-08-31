import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingBasket, faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { currentUser, isBuyer } = useAuth();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirect if not logged in or not a buyer
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (!isBuyer()) {
      navigate('/');
    }
  }, [currentUser, isBuyer, navigate]);

  const handleQuantityChange = (productId, e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(productId, value);
    }
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a payment gateway
    // For this demo, we'll simulate a successful checkout
    setCheckoutSuccess(true);
    
    // Generate a fake order
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: `order-${Date.now()}`,
      userId: currentUser.id,
      items: [...cartItems],
      total: getCartTotal(),
      status: 'processing',
      date: new Date().toISOString()
    };
    
    // Save the order to localStorage
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the cart
    clearCart();
    
    // Redirect to orders page after a brief delay
    setTimeout(() => {
      navigate('/buyer/orders');
    }, 3000);
  };

  // If there's no user or not a buyer, show nothing while redirecting
  if (!currentUser || !isBuyer()) {
    return null;
  }

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">Your Shopping Cart</h1>
      
      {checkoutSuccess && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Order Placed Successfully!</Alert.Heading>
          <p>Thank you for your purchase! Your order has been placed successfully. You will be redirected to your orders page in a moment.</p>
        </Alert>
      )}
      
      {cartItems.length === 0 ? (
        <Card className="text-center p-5">
        
          <h3>Your Cart is Empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added any plants to your cart yet.</p>
        
        </Card>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col lg={8} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
              </Card.Header>
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.productId} className="py-3">
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={9} md={4}>
                        <Link 
                          to={`/product/${item.productId}`}
                          className="text-decoration-none text-dark"
                        >
                          <h6 className="mb-1">{item.name}</h6>
                        </Link>
                        <small className="text-muted">Seller: {item.sellerName}</small>
                      </Col>
                      <Col xs={6} md={2} className="mt-3 mt-md-0">
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, e)}
                          className="text-center"
                          size="sm"
                        />
                      </Col>
                      <Col xs={6} md={2} className="text-end mt-3 mt-md-0">
                        <div className="fw-bold text-success">
                          ₹{item.price}
                        </div>
                        <div className="text-muted small">
                          ₹{item.price} x {item.quantity}
                        </div>
                      </Col>
                      <Col xs={12} md={2} className="text-end mt-3 mt-md-0">
                        <Button 
                          variant="link" 
                          className="text-danger p-0"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
          
            </Card>
          </Col>
          
          {/* Order Summary */}
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span className="text-success">₹{getCartTotal()}</span>
                </div>
                <div className="d-grid">
                  <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleCheckout}
                    disabled={checkoutSuccess}
                  >
                    {checkoutSuccess ? 'Order Placed!' : 'Proceed to Checkout'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
          
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;