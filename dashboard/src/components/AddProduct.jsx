import React, { useState } from 'react';
import '../styles/addProduct.css';

function AddProduct({ addProduct, setActiveView }) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock)
    });
    setActiveView('products');
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={product.price} 
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
            value={product.category} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input 
            type="number" 
            name="stock" 
            value={product.stock} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Add Product</button>
        <button type="button" onClick={() => setActiveView('products')}>Cancel</button>
      </form>
    </div>
  );
}

export default AddProduct;