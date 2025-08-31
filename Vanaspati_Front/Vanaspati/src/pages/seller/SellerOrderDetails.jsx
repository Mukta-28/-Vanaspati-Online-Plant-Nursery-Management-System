import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const SellerOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const selectedOrder = allOrders.find(o => o.id === id);
    if (!selectedOrder) {
      alert('Order not found');
      navigate('/seller/dashboard');
      return;
    }

    setOrder(selectedOrder);
    setStatus(selectedOrder.status);
  }, [id, navigate]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = allOrders.map(o => {
      if (o.id === order.id) {
        return { ...o, status: newStatus };
      }
      return o;
    });

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrder(prev => ({ ...prev, status: newStatus }));
    alert("Status updated successfully!");
  };

  if (!order) return null;

  const sellerItems = order.items.filter(item => item.sellerId === currentUser.id);

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-sm border-0">
        <h3 className="mb-4 text-center fw-bold">Edit Order Status</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Order ID</Form.Label>
            <Form.Control type="text" value={order.id} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Order Date</Form.Label>
            <Form.Control type="text" value={new Date(order.date).toLocaleDateString()} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Buyer Name</Form.Label>
            <Form.Control type="text" value={order.buyerName || 'N/A'} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={handleStatusChange}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="delivered">Delivered</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Items Sold by You</Form.Label>
            <ul className="list-group">
              {sellerItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <div>{item.name} (x{item.quantity})</div>
                  <div>₹{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          </Form.Group>

          <Button
            variant="success"
            type="button"
            className="w-100 fw-bold"
            onClick={() => alert("Changes saved. Buyer will see updated status.")}
          >
            Save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SellerOrderDetails;
