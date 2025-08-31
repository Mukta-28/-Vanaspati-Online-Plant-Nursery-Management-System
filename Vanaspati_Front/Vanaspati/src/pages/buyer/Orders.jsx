import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BuyerOrders = () => {
  const { currentUser, isBuyer } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = () => {
      const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const buyerOrders = allOrders.filter(order => order.userId === currentUser.id);
      buyerOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(buyerOrders);
      setFilteredOrders(buyerOrders);
      setLoading(false);
    };

    if (!currentUser || !isBuyer()) {
      navigate('/login');
      return;
    }

    fetchOrders();

    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchOrders();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optional polling every 5 seconds
    // const interval = setInterval(fetchOrders, 5000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // clearInterval(interval);
    };
  }, [currentUser, isBuyer, navigate]);

  useEffect(() => {
    let result = [...orders];

    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(result);
  }, [orders, statusFilter, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'approved':
        return 'info';
      case 'delivered':
        return 'primary';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">My Orders</h1>

      {/* Filters and Search */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={12} className="d-flex justify-content-md-start align-items-center">
              <div className="d-flex align-items-center">
                <label className="me-2 text-nowrap">Filter by Status:</label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-auto"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <Card key={order.id} className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">Order #{order.id.substring(0, 8)}</h5>
                </Col>
                <Col xs="auto">
                  <Badge bg={getStatusVariant(order.status)} className="me-2 text-uppercase">
                    {order.status}
                  </Badge>
                  <small className="text-muted">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </small>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h6>Order Items</h6>
                  <Table responsive borderless className="mb-0">
                    <thead className="text-muted small">
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                className="rounded me-2"
                              />
                              <div>
                                <div>{item.name}</div>
                                <small className="text-muted">Sold by: {item.sellerName}</small>
                              </div>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={4} className="mt-4 mt-md-0">
                  <div className="border p-3 rounded">
                    <h6 className="mb-3">Order Summary</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="text-center p-5 shadow-sm">
          <div className="mb-4">
            <FontAwesomeIcon icon={faBoxOpen} size="3x" className="text-muted" />
          </div>
          <h3>No Orders Found</h3>
          <p className="text-muted mb-4">
            {orders.length === 0
              ? "You haven't placed any orders yet."
              : "No orders match your search filters."}
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/plants">
              <Button variant="success" className="rounded-pill px-4">
                Start Shopping
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default BuyerOrders;
