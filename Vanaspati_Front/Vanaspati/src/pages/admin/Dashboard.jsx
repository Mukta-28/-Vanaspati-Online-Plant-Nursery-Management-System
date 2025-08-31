import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLeaf, faShoppingCart, faStore, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSellers: 0
  });

  useEffect(() => {
    // Redirect if not admin
    if (!currentUser || !isAdmin()) {
      navigate('/login');
      return;
    }

    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);

    // Calculate stats
    setStats({
      totalUsers: storedUsers.length,
      totalProducts: products.length,
      totalOrders: storedOrders.length,
      totalSellers: storedUsers.filter(user => user.role === 'seller').length
    });
  }, [currentUser, isAdmin, navigate, products]);

  return (
    <Container fluid className="py-4">
      <h1 className="fw-bold mb-4">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faUsers} size="lg" className="text-primary" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Users</h6>
                <h3>{stats.totalUsers}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faLeaf} size="lg" className="text-success" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Products</h6>
                <h3>{stats.totalProducts}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
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
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                <FontAwesomeIcon icon={faStore} size="lg" className="text-info" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Sellers</h6>
                <h3>{stats.totalSellers}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Users */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Users</h5>
              <Link to="/admin/users" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={
                          user.role === 'admin' ? 'danger' : 
                          user.role === 'seller' ? 'primary' : 'success'
                        }>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-secondary" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Recent Orders */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/admin/orders" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td>{order.id.substring(0, 8)}...</td>
                      <td>
                        {users.find(user => user.id === order.userId)?.name || 'Unknown'}
                      </td>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Products by Category */}
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Products by Category
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="text-center">
                  <h5>Category Distribution</h5>
                  <p className="text-muted mb-0">Distribution of products across categories</p>
                  <div className="mt-4">
                    {/* In a real app, we'd have a chart here */}
                    {Array.from(new Set(products.map(p => p.category))).map(category => (
                      <div key={category} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>{category}</span>
                          <span>
                            {products.filter(p => p.category === category).length} products
                          </span>
                        </div>
                        <div className="progress" style={{height: "10px"}}>
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{
                              width: `${(products.filter(p => p.category === category).length / products.length) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;