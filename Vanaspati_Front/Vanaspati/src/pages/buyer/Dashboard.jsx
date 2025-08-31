import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen, faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BuyerDashboard = () => {
  const { currentUser, isBuyer } = useAuth();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);

  
  // Stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    // Redirect if not buyer
    if (!currentUser || !isBuyer()) {
      navigate('/login');
      return;
    }

    // Get buyer's orders
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const buyerOrders = allOrders.filter(order => order.userId === currentUser.id);
    setMyOrders(buyerOrders);

    // Get buyer's favorites (would be stored in localStorage in a real app)
    // For now we'll just use an empty array
 

    // Calculate stats
    const totalSpent = buyerOrders.reduce((total, order) => total + order.total, 0);
    const pendingOrders = buyerOrders.filter(order => order.status === 'processing').length;

    setStats({
      totalOrders: buyerOrders.length,
      pendingOrders: pendingOrders,
      totalSpent: totalSpent
    });
  }, [currentUser, isBuyer, navigate]);

  return (
    <Container fluid className="py-4">
      <h1 className="fw-bold mb-4">My Dashboard</h1>
      
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-warning" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Orders</h6>
                <h3>{stats.totalOrders}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faBoxOpen} size="lg" className="text-info" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Pending Orders</h6>
                <h3>{stats.pendingOrders}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-success" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Spent</h6>
                <h3>₹{stats.totalSpent}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Orders */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/buyer/orders" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              {myOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">You haven't placed any orders yet.</p>
                  <Link to="/plants" className="btn btn-outline-success">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <Table responsive hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
              
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td>{order.id.substring(0, 8)}...</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.items.length} items</td>
                        <td>₹{order.total}</td>
                        <td>
                          <Badge bg={
                            order.status === 'completed' ? 'success' : 
                            order.status === 'processing' ? 'warning' : 'secondary'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                   
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        {/* User Profile Card */}
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <h5>{currentUser?.name}</h5>
              <p className="text-muted">{currentUser?.email}</p>
              <Link to="/Edit">
                <Button variant="outline-success">
                  Update Profile
                </Button>
              </Link>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
      
     
    </Container>
  );
};

export default BuyerDashboard;