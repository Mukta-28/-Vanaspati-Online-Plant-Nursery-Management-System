import React from 'react';

const BuyerProfile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Buyer Profile</h2>
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BuyerProfile;