import React, { useState } from 'react';

const AddItemWindow = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    locationCode: '',
    locationDesc: '',
    itemCode: '',
    itemDesc: '',
    qty: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      LocationCode: formData.locationCode,
      LocationDesc: formData.locationDesc,
      items: [{
        ItemCode: formData.itemCode,
        ItemDesc: formData.itemDesc,
        Qty: Number(formData.qty),
        Amount: Number(formData.amount)
      }]
    };
    onAddItem(newItem);
    setFormData({
      locationCode: '',
      locationDesc: '',
      itemCode: '',
      itemDesc: '',
      qty: '',
      amount: ''
    });
  };

  return (
    <div className="data-window enhanced-window add-item-window">
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Location Code</label>
          <input
            type="text"
            className="form-control"
            name="locationCode"
            value={formData.locationCode}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Location Description</label>
          <input
            type="text"
            className="form-control"
            name="locationDesc"
            value={formData.locationDesc}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Item Code</label>
          <input
            type="text"
            className="form-control"
            name="itemCode"
            value={formData.itemCode}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Item Description</label>
          <input
            type="text"
            className="form-control"
            name="itemDesc"
            value={formData.itemDesc}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemWindow;