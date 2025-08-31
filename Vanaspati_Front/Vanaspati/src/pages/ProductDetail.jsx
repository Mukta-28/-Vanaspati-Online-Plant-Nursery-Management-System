import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Breadcrumb, Image, Badge, Tabs, Tab, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faLeaf, faSun, faTint, faRulerVertical } from '@fortawesome/free-solid-svg-icons';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { currentUser, isBuyer } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const foundProduct = getProduct(productId);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, getProduct]);

  const handleAddToCart = () => {
    console.log("::::>s", isBuyer(), currentUser);
    if (currentUser?.email && isBuyer()) {
      const success = addToCart(product, quantity);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      }
    } else if (!currentUser) {
      alert('Please login to add items to your cart');
    } else {
      alert('Only buyers can add items to cart');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/plants">
          <Button variant="success">Browse Plants</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
     

      {/* Product Details */}
      <Row className="mb-5">
        {/* Product Image */}
        <Col md={5} className="mb-4 mb-md-0">
          <div className="position-relative">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fluid 
              className="rounded shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            {product.stock < 5 && (
              <Badge 
                bg="warning" 
                text="dark" 
                className="position-absolute top-0 end-0 m-3 px-3 py-2"
              >
                Only {product.stock} left!
              </Badge>
            )}
          </div>
        </Col>
        
        {/* Product Info */}
        <Col md={7}>
          <h1 className="fw-bold mb-2">{product.name}</h1>
          
          <div className="d-flex align-items-center mb-3">
            <span className="text-muted">Sold by: </span>
            <Link to={`/seller/${product.sellerId}`} className="ms-2 text-decoration-none">
              {product.sellerName}
            </Link>
          </div>
          
          <div className="fs-3 fw-bold text-success mb-3">
            ₹{product.price}
          </div>
          
          <p className="text-muted mb-4">{product.description}</p>
          
          <div className="mb-4">
            <Row className="g-3">
              <Col sm={4}>
                <div className="d-flex align-items-center">
                  <span>Category: {product.category}</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="d-flex align-items-center">
                  <span>Stock: {product.stock} available</span>
                </div>
              </Col>
            </Row>
          </div>
          
          <div className="mb-4">
            <Row className="align-items-center">
              <Col xs={5} sm={3}>
                <Form.Label className="mb-0">Quantity:</Form.Label>
              </Col>
              <Col xs={7} sm={4}>
                <Form.Control
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </Col>
            </Row>
          </div>
          
          <Row className="mb-4">
            <Col xs={8} md={6}>
              <Button 
                variant="success" 
                className="w-100 py-2" 
                onClick={handleAddToCart}
                disabled={addedToCart || product.stock === 0}
              >
                {addedToCart ? (
                  'Added to Cart!'
                ) : product.stock === 0 ? (
                  'Out of Stock'
                ) : (
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

export default ProductDetail;