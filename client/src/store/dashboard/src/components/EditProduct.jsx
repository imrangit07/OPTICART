import React, { useState, useEffect } from 'react';
import '../styles/editProduct.css';

function EditProduct({ product, setActiveView }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({
      ...editedProduct,
      price: parseFloat(editedProduct.price),
      stock: parseInt(editedProduct.stock)
    });
    setActiveView('products');
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            name="name" 
            value={editedProduct.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={editedProduct.price} 
            onChange={handleChange} 
            step="0.01" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input 
            type="text" 
            name="category" 
            value={editedProduct.categories} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input 
            type="number" 
            name="stock" 
            value={editedProduct.stock_quantity} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Update Product</button>
        <button type="button" onClick={() => setActiveView('products')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProduct;