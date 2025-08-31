// import { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLeaf, faShoppingCart, faChartLine, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useProducts } from '../../context/ProductContext';

// const SellerDashboard = () => {
//   const { currentUser, isSeller } = useAuth();
//   const { getProductsBySeller } = useProducts();
//   const navigate = useNavigate();
//   const [myProducts, setMyProducts] = useState([]);
//   const [myOrders, setMyOrders] = useState([]);

//   // Stats
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     lowStock: 0
//   });

//   useEffect(() => {
//     // Redirect if not seller
//     if (!currentUser || !isSeller()) {
//       navigate('/login');
//       return;
//     }

//     // Get seller's products
//     const sellerProducts = getProductsBySeller(currentUser.id);
//     setMyProducts(sellerProducts);

//     // Get orders containing seller's products
//     const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
//     const sellerOrders = allOrders.filter(order => 
//       order.items.some(item => item.sellerId === currentUser.id)
//     );
//     setMyOrders(sellerOrders);

//     // Calculate stats
//     setStats({
//       totalProducts: sellerProducts.length,
//       totalOrders: sellerOrders.length,
//       totalRevenue: calculateTotalRevenue(sellerOrders, currentUser.id),
//       lowStock: sellerProducts.filter(product => product.stock < 5).length
//     });
//   }, [currentUser, isSeller, navigate, getProductsBySeller]);

//   const calculateTotalRevenue = (orders, sellerId) => {
//     return orders.reduce((total, order) => {
//       const sellerItems = order.items.filter(item => item.sellerId === sellerId);
//       const orderTotal = sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//       return total + orderTotal;
//     }, 0);
//   };

//   return (
//     <Container fluid className="py-4">
//       <h1 className="fw-bold mb-4">Seller Dashboard</h1>

//       {/* Stats Cards */}
//       <Row className="g-4 mb-4">
//         <Col md={3}>
//           <Card className="shadow-sm h-100">
//             <Card.Body className="d-flex">
//               <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
//                 <FontAwesomeIcon icon={faLeaf} size="lg" className="text-success" />
//               </div>
//               <div className="ms-3">
//                 <h6 className="text-muted mb-1">My Products</h6>
//                 <h3>{stats.totalProducts}</h3>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="shadow-sm h-100">
//             <Card.Body className="d-flex">
//               <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
//                 <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-warning" />
//               </div>
//               <div className="ms-3">
//                 <h6 className="text-muted mb-1">My Orders</h6>
//                 <h3>{stats.totalOrders}</h3>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="shadow-sm h-100">
//             <Card.Body className="d-flex">
//               <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
//                 <FontAwesomeIcon icon={faMoneyBill} size="lg" className="text-primary" />
//               </div>
//               <div className="ms-3">
//                 <h6 className="text-muted mb-1">Total Revenue</h6>
//                 <h3>₹{stats.totalRevenue}</h3>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="shadow-sm h-100">
//             <Card.Body className="d-flex">
//               <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
//                 <FontAwesomeIcon icon={faLeaf} size="lg" className="text-danger" />
//               </div>
//               <div className="ms-3">
//                 <h6 className="text-muted mb-1">Low Stock</h6>
//                 <h3>{stats.lowStock}</h3>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* My Products */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">My Products</h5>
//               <Link to="/seller/add-product" className="btn btn-success btn-sm">
//                 Add New Product
//               </Link>
//             </Card.Header>
//             <Card.Body>
//               {myProducts.length === 0 ? (
//                 <div className="text-center py-4">
//                   <p className="text-muted">You haven't added any products yet.</p>
//                   <Link to="/seller/add-product" className="btn btn-outline-success">
//                     Add Your First Product
//                   </Link>
//                 </div>
//               ) : (
//                 <Table responsive hover className="align-middle">
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Price</th>
//                       <th>Stock</th>
//                       <th>Category</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {myProducts.map(product => (
//                       <tr key={product.id}>
//                         <td>
//                           <img 
//                             src={product.imageUrl} 
//                             alt={product.name} 
//                             style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                             className="rounded"
//                           />
//                         </td>
//                         <td>{product.name}</td>
//                         <td>₹{product.price}</td>
//                         <td>
//                           {product.stock < 5 ? (
//                             <span className="text-danger fw-bold">{product.stock}</span>
//                           ) : (
//                             product.stock
//                           )}
//                         </td>
//                         <td>{product.category}</td>
//                         <td>
//                           <Link to={`/seller/edit-product/${product.id}`}>
//                             <Button variant="outline-primary" size="sm" className="me-2">
//                               Edit
//                             </Button>
//                           </Link>
//                           <Button variant="outline-danger" size="sm">
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Orders */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Recent Orders</h5>
//               <Link to="/seller/orders" className="text-decoration-none">View All</Link>
//             </Card.Header>
//             <Card.Body>
//               {myOrders.length === 0 ? (
//                 <div className="text-center py-4">
//                   <p className="text-muted">You don't have any orders yet.</p>
//                 </div>
//               ) : (
//                 <Table responsive hover className="align-middle">
//                   <thead>
//                     <tr>
//                       <th>Order ID</th>
//                       <th>Date</th>
//                       <th>Items</th>
//                       <th>Amount</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {myOrders.slice(0, 5).map(order => (
//                       <tr key={order.id}>
//                         <td>{order.id.substring(0, 8)}...</td>
//                         <td>{new Date(order.date).toLocaleDateString()}</td>
//                         <td>
//                           {order.items.filter(item => item.sellerId === currentUser.id).length} items
//                         </td>
//                         <td>
//                           ₹{order.items
//                             .filter(item => item.sellerId === currentUser.id)
//                             .reduce((sum, item) => sum + (item.price * item.quantity), 0)
//                           }
//                         </td>
//                         <td>
//                           <Badge bg={
//                             order.status === 'completed' ? 'success' : 
//                             order.status === 'processing' ? 'warning' : 'secondary'
//                           }>
//                             {order.status}
//                           </Badge>
//                         </td>
//                         <td>
//                           <Link to={`/seller/orders/${order.id}`}>
//                             <Button variant="outline-secondary" size="sm">
//                               View
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Sales Chart */}
//       <Row>
//         <Col md={12}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white">
//               <h5 className="mb-0">
//                 <FontAwesomeIcon icon={faChartLine} className="me-2" />
//                 Sales Overview
//               </h5>
//             </Card.Header>
//             <Card.Body>
//               <div className="text-center py-4">
//                 <p className="text-muted">In a real application, this would display a chart showing sales trends over time.</p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SellerDashboard;



import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faShoppingCart, faChartLine, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSeeds } from '../../context/SeedsContext';

const SellerDashboard = () => {
  const { currentUser, isSeller } = useAuth();
  const { getProductsBySeller } = useProducts();
  const navigate = useNavigate();

  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  });

  useEffect(() => {
    if (!currentUser || !isSeller()) {
      navigate('/login');
      return;
    }

    const sellerProducts = getProductsBySeller(currentUser.id);
    setMyProducts(sellerProducts);

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const sellerOrders = allOrders.filter(order =>
      order.items.some(item => item.sellerId === currentUser.id)
    );
    setMyOrders(sellerOrders);

    setStats({
      totalProducts: sellerProducts.length,
      totalOrders: sellerOrders.length,
      totalRevenue: calculateTotalRevenue(sellerOrders, currentUser.id),
      lowStock: sellerProducts.filter(product => product.stock < 5).length
    });
  }, [currentUser, isSeller, navigate, getProductsBySeller]);

  const calculateTotalRevenue = (orders, sellerId) => {
    return orders.reduce((total, order) => {
      const sellerItems = order.items.filter(item => item.sellerId === sellerId);
      const orderTotal = sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return total + orderTotal;
    }, 0);
  };

  const handleEdit = (product) => {
    switch (product.category) {
      case 'Plant':
        navigate(`/seller/plant/edit/${product.id}`);
        break;
      case 'Seed':
        navigate(`/seller/seed/edit/${product.id}`);
        break;
      case 'Pot':
        navigate(`/seller/pot/edit/${product.id}`);
        break;
      case 'PlantCare':
        navigate(`/seller/plantcare/edit/${product.id}`);
        break;
      default:
        break;
    }
  };

  const handleDelete = (product) => {
    const updatedProducts = myProducts.filter(p => p.id !== product.id);
    setMyProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <Container fluid className="py-4">
      <h1 className="fw-bold mb-4">Seller Dashboard</h1>

      {/* Stats */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <FontAwesomeIcon icon={faLeaf} className="text-success" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">My Products</h6>
                <h3>{stats.totalProducts}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <FontAwesomeIcon icon={faShoppingCart} className="text-warning" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">My Orders</h6>
                <h3>{stats.totalOrders}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex">
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                <FontAwesomeIcon icon={faMoneyBill} className="text-primary" />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Revenue</h6>
                <h3>₹{stats.totalRevenue}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>

      {/* Products Table */}
      {/* <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Products</h5>
              <DropdownButton title="Add New Product" variant="success" size="sm">
                <Dropdown.Item as={Link} to="/seller/add-product?type=plant">Add Plants</Dropdown.Item>
                <Dropdown.Item as={Link} to="/seller/add-product?type=seed">Add Seeds</Dropdown.Item>
                <Dropdown.Item as={Link} to="/seller/add-product?type=pot">Add Pots</Dropdown.Item>
                <Dropdown.Item as={Link} to="/seller/add-product?type=plantcare">Add PlantCare</Dropdown.Item>
              </DropdownButton>
            </Card.Header>
            <Card.Body>
              {myProducts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">You haven't added any products yet.</p>
                </div>
              ) : (
                <Table responsive hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                        </td>
                        <td>{product.name}</td>
                        <td>₹{product.price}</td>
                        <td>{product.stock < 5 ? <span className="text-danger fw-bold">{product.stock}</span> : product.stock}</td>
                        <td>{product.category}</td>
                        <td>
                          <Button variant="warning" onClick={() => navigate(`/seller/edit-product/`)}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      {/* My Products by Category */}
 {/* My Products by Category with Add Buttons */}
<Row className="mb-4">
  {['Plant', 'Seed', 'Pot', 'PlantCare'].map(category => {
    const categoryProducts = myProducts.filter(p => p.category === category);

    // Convert category to lowercase for dynamic route
    const routeType = category.toLowerCase();

    return (
      <Col md={6} key={category} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{category}s</h5>
            <Button
              variant="success"
              size="sm"
              as={Link}
              to={`/seller/add-product?type=${routeType}`}
            >
              + Add {category}
            </Button>
          </Card.Header>
          <Card.Body>
            {categoryProducts.length === 0 ? (
              <div className="text-center text-muted">No {category.toLowerCase()}s added.</div>
            ) : (
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>
                        {product.stock < 5 ? (
                          <span className="text-danger fw-bold">{product.stock}</span>
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  })}
</Row>



      {/* Recent Orders */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/seller/orders" className="text-decoration-none">View All</Link>
            </Card.Header>
            <Card.Body>
              {myOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">You don't have any orders yet.</p>
                </div>
              ) : (
                <Table responsive hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td>{order.id.substring(0, 8)}...</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.items.filter(item => item.sellerId === currentUser.id).length} items</td>
                        <td>
                          ₹{order.items
                            .filter(item => item.sellerId === currentUser.id)
                            .reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        </td>
                        <td>
                          <Badge bg={
                            order.status === 'completed' ? 'success' :
                              order.status === 'processing' ? 'warning' :
                                'secondary'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Link to={`/seller/orders/${order.id}`}>
                            <Button variant="outline-secondary" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    
    </Container>
  );
};

export default SellerDashboard;