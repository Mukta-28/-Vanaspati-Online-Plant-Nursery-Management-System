// import { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validate form
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true);


//       const users = JSON.parse(localStorage.getItem('users')) || [];
//       const user = users.find(u => u.email === email);

//       if (!user) {
//         throw new Error('User not found');
//       }

//       if (user.password !== password) {
//         throw new Error('Invalid credentials');
//       }

//       // Login successful
//       const loginSuccess = login({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       });

//       if (!loginSuccess) {
//         throw new Error('Failed to login');
//       }

//       // Redirect based on user role
//       switch (user.role) {

//         case 'seller':
//           navigate('/seller/dashboard');
//           break;
//         case 'buyer':
//           navigate('/');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">

//                 <h2 className="fw-bold">Login to वनस्पति</h2>
//                 <p className="text-muted">Welcome back! Please login to your account</p>
//               </div>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <div className="d-grid">
//                   <Button 
//                     variant="success" 
//                     type="submit" 
//                     disabled={loading}
//                     className="py-2"
//                   >
//                     {loading ? 'Logging in...' : 'Login'}
//                   </Button>
//                 </div>
//               </Form>


//             </Card.Body>
//           </Card>


//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


// // import { useState } from 'react';
// // import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// // import { useAuth } from '../context/AuthContext';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const ADMIN_EMAIL = 'admin@example.com';
// //   const ADMIN_PASSWORD = 'admin123';

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');

// //     if (!email || !password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const response = await fetch('http://localhost:8080/api/buyer/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || 'Login failed');
// //       }

// //       const data = await response.json();

// //       const loginSuccess = login({
// //         id: data.userId,
// //         name: data.userName,
// //         email: data.userEmail,
// //         role: data.userRole,
// //         token: data.accessToken
// //       });

// //       if (!loginSuccess) {
// //         throw new Error('Failed to login');
// //       }

// //       // Redirect based on role
// //       switch (data.userRole.toLowerCase()) {
// //         case 'buyer':
// //           navigate('/');
// //           break;
// //         case 'seller':
// //           navigate('/seller/dashboard');
// //           break;
// //         case 'admin':
// //           navigate('/admin/dashboard');
// //           break;
// //         default:
// //           navigate('/');
// //       }
// //     } catch (err) {
// //       setError(err.message || 'Failed to login');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   return (
// //     <Container className="py-5">
// //       <Row className="justify-content-center">
// //         <Col md={6}>
// //           <Card className="border-0 shadow-sm">
// //             <Card.Body className="p-4">
// //               <div className="text-center mb-4">
// //                 <h2 className="fw-bold">Login to वनस्पति</h2>
// //                 <p className="text-muted">Welcome back! Please login to your account</p>
// //               </div>

// //               {error && <Alert variant="danger">{error}</Alert>}

// //               <Form onSubmit={handleSubmit}>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Email Address</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <Form.Group className="mb-4">
// //                   <Form.Label>Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <div className="d-grid">
// //                   <Button
// //                     variant="success"
// //                     type="submit"
// //                     disabled={loading}
// //                     className="py-2"
// //                   >
// //                     {loading ? 'Logging in...' : 'Login'}
// //                   </Button>
// //                 </div>
// //               </Form>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default Login;


import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      
      
      const response = await fetch('http://localhost:8080/api/buyer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
//       const response = await fetch('http://localhost:8080/api/buyer/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email, password }),
// });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }


      const data = await response.json();
      console.log('Login response:', data);

      const loginSuccess = login({
        id: data.userId,
        name: data.userName,
        email: data.userEmail,
        role: data.userRole,
        token: data.accessToken
      });


      if (!loginSuccess) {
        throw new Error('Failed to login');
      }

      // Safely handle navigation
  switch (data?.userRole?.toLowerCase?.()) {
        case 'buyer':
          navigate('/');
          break;
        case 'seller':
          navigate('/seller/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Login to वनस्पति</h2>
                <p className="text-muted">Welcome back! Please login to your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


// import { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const ADMIN_EMAIL = 'admin@example.com';
//   const ADMIN_PASSWORD = 'admin123';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true);

//       if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//         const loginSuccess = login({
//           id: 'admin-001',
//           name: 'Admin User',
//           email: ADMIN_EMAIL,
//           role: 'admin'
//         });

//         if (!loginSuccess) {
//           throw new Error('Failed to login');
//         }

//         navigate('/admin/dashboard');
//         return;
//       }

//       // 👤 Check in localStorage for seller/buyer
//       const users = JSON.parse(localStorage.getItem('users')) || [];
//       const user = users.find(u => u?.email === email);

//       if (!user) {
//         throw new Error('User not found');
//       }

//       if (user.password !== password) {
//         throw new Error('Invalid credentials');
//       }

//       const loginSuccess = login({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       });

//       if (!loginSuccess) {
//         throw new Error('Failed to login');
//       }

//       // 🧭 Redirect based on role
//       switch (user.role) {
//         case 'seller':
//           navigate('/seller/dashboard');
//           break;
//         case 'buyer':
//           navigate('/');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold">Login to वनस्पति</h2>
//                 <p className="text-muted">Welcome back! Please login to your account</p>
//               </div>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
                
//                 <div className="d-grid">
//                   <Button 
//                     variant="success" 
//                     type="submit" 
//                     disabled={loading}
//                     className="py-2"
//                   >
//                     {loading ? 'Logging in...' : 'Login'}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
