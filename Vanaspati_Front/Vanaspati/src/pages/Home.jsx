import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf, faSeedling, faBox, faFlask,
  faTint, faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

import { useProducts } from '../context/ProductContext';
import HeroCarousel from '../components/layout/HeroCarousel';

const Home = () => {
  const { products, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
      setFeaturedProducts(randomProducts);

      const sortedProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 4);
      setNewArrivals(sortedProducts);
    }
  }, [products, loading]);

  return (
    <>
      <HeroCarousel />

      {/* Categories Section */}
      <Container className="mb-5">
        <h2 className="text-center mb-4 fw-bold">Browse Categories</h2>
        <Row>
          {/* Plants */}
          <Col md={3} sm={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center">
              <div className="py-4 bg-light">
                <FontAwesomeIcon icon={faLeaf} className="text-success" size="3x" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Plants</Card.Title>
                <Link to="/plants" className="mt-3">
                  <Button variant="outline-success" className="rounded-pill">Browse Plants</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Seeds */}
          <Col md={3} sm={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center">
              <div className="py-4 bg-light">
                <FontAwesomeIcon icon={faSeedling} className="text-success" size="3x" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Seeds</Card.Title>
                <Link to="/seeds" className="mt-3">
                  <Button variant="outline-success" className="rounded-pill">Browse Seeds</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Pots */}
          <Col md={3} sm={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center">
              <div className="py-4 bg-light">
                <FontAwesomeIcon icon={faBox} className="text-primary" size="3x" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Pots & Planters</Card.Title>
                <Link to="/pots" className="mt-3">
                  <Button variant="outline-success" className="rounded-pill">Browse Pots & Planters</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Fertilizers */}
          <Col md={3} sm={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center">
              <div className="py-4 bg-light">
                <FontAwesomeIcon icon={faFlask} className="text-warning" size="3x" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Plant Care </Card.Title>
                <Link to="/plantcare" className="mt-3">
                  <Button variant="outline-success" className="rounded-pill">Browse Plant Care</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Why Choose Us */}
      <div className="bg-light py-5 mb-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Why Choose Vanaspati?</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-success bg-opacity-10 mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <FontAwesomeIcon icon={faLeaf} size="2x" className="text-success" />
                </div>
                <h4>Quality Plants</h4>
                <p className="text-muted">We ensure all plants are healthy, pest-free, and ready to thrive in your home or garden.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-success bg-opacity-10 mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <FontAwesomeIcon icon={faTint} size="2x" className="text-success" />
                </div>
                <h4>Expert Care</h4>
                <p className="text-muted">Get detailed care instructions with every plant to ensure they flourish in your care.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-success bg-opacity-10 mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} size="2x" className="text-success" />
                </div>
                <h4>Trusted Sellers</h4>
                <p className="text-muted">All sellers on our platform are verified and committed to providing the best quality products.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
