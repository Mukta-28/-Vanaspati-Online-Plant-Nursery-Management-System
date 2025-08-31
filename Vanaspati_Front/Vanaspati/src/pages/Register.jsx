import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      
      // In a real app, we would connect to a backend API
      // For this demo, we'll simulate registration with localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        name,
        email,
        password,
        role,
        id: Date.now().toString()
      };
      
      // Register the user (this also logs them in)
      const registerSuccess = register(newUser);
      
      if (!registerSuccess) {
        throw new Error('Failed to register');
      }
      
      // Create demo data if registering first admin user
      if (role === 'admin' && !users.some(user => user.role === 'admin')) {
        createDemoData();
      }
      
      // Redirect based on user role
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'seller':
          navigate('/seller/dashboard');
          break;
        case 'buyer':
          navigate('/buyer/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  // Function to create demo data for the app
  const createDemoData = () => {
    // Create demo users if they don't exist
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if demo users already exist
    if (!users.some(user => user.email === 'admin@vanaspati.com')) {
      users.push({
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@vanaspati.com',
        password: 'admin123',
        role: 'admin'
      });
    }
    
    if (!users.some(user => user.email === 'seller@vanaspati.com')) {
      users.push({
        id: 'seller1',
        name: 'Green Thumb Nursery',
        email: 'seller@vanaspati.com',
        password: 'seller123',
        role: 'seller'
      });
    }
    
    if (!users.some(user => user.email === 'buyer@vanaspati.com')) {
      users.push({
        id: 'buyer1',
        name: 'John Doe',
        email: 'buyer@vanaspati.com',
        password: 'buyer123',
        role: 'buyer'
      });
    }
    
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <FontAwesomeIcon icon={faLeaf} className="text-success mb-3" size="3x" />
                <h2 className="fw-bold">Create an Account</h2>
                <p className="text-muted">Join Vanaspati and start your plant journey</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter password (min. 6 characters)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    {role === 'buyer' && 'As a buyer, you can browse and purchase plants from sellers.'}
                    {role === 'seller' && 'As a seller, you can list and sell plants on the platform.'}
                    {role === 'admin' && 'As an admin, you can manage the entire platform.'}
                  </Form.Text>
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? 'Creating Account...' : 'Register'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <p>
              Already have an account? <Link to="/login" className="text-success">Login here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;