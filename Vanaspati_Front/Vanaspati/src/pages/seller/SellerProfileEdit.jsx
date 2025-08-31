import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerProfileEdit = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    const [ownerName, setOwnerName] = useState(user.ownerName || '');
    const [nurseryName, setNurseryName] = useState(user.nurseryName || '');
    
    const [email, setEmail] = useState(user.email || '');
    const [contactNumber, setContactNumber] = useState(user.contactNumber || '');
    const [address, setAddress] = useState(user.address || '');
    const [gstin, setGstin] = useState(user.gstin || '');

    const navigate = useNavigate();

    const handleSave = () => {
        const updatedUser = {
            ...user,
            ownerName,
            nurseryName,
            
            email,
            contactNumber,
            address,
            gstin
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
        navigate('/seller-profile');
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2>Edit Seller Profile</h2>

                <div className="mb-3">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Nursery Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nurseryName}
                        onChange={(e) => setNurseryName(e.target.value)}
                    />
                </div>

                

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>GSTIN</label>
                    <input
                        type="text"
                        className="form-control"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default SellerProfileEdit;