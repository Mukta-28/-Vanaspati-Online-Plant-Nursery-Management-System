import React, { useState } from 'react';

const BuyerProfileEdit = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, phone, address };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title mb-4">Edit Buyer Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
          </div>
          <button type="submit" className="btn btn-success">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default BuyerProfileEdit;