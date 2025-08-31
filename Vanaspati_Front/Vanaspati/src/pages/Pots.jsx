import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { usePots } from "../context/PotsContext";

const Pots = () => {
  const { pots, loading } = usePots();
  const [visiblePots, setVisiblePots] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    let result = [...pots];

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setVisiblePots(result);
  }, [pots, sortOption]);

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">Browse Pots & Planters</h1>

      {/* Sort Dropdown */}
      <div className="bg-light p-4 rounded mb-4">
        <Row>
          <Col lg={4}>
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <FontAwesomeIcon icon={faSort} />
              </InputGroup.Text>
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>

      {/* Pots Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : visiblePots.length > 0 ? (
        <Row>
          {visiblePots.map((pot) => (
            <Col lg={3} md={4} sm={6} className="mb-4" key={pot.id}>
              <Card className="h-100 border-0 shadow-sm product-card">
                <Card.Img
                  variant="top"
                  src={pot.imageUrl}
                  alt={pot.name}
                  className="product-img"
                />
                <Card.Body>
                  <Card.Title className="fs-5">{pot.name}</Card.Title>
                  <div className="text-success fw-bold mb-2">₹{pot.price}</div>
                  <Card.Text className="small text-muted">
                    {(pot.description || "No description").substring(0, 80)}...
                  </Card.Text>
                  <Link to={`/pot/${pot.id}`}>
                    <Button variant="outline-success" className="w-100">
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>No Pots Available</h4>
          <p className="text-muted">Please check back soon for more variety.</p>
        </div>
      )}
    </Container>
  );
};

export default Pots;
