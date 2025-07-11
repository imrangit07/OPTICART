import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackendURL from '../config/backendURL';
import '../styles/editProduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    // Fetch product by ID
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BackendURL}/admin/getProductById/${id}`);
        setEditedProduct(res.data.product);
      } catch (error) {
        console.error(error);
        alert('Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BackendURL}/admin/updateProduct/${id}`, editedProduct);
      alert('Product updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };

  if (!editedProduct) return <div>Loading...</div>;

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
            name="categories" 
            value={editedProduct.categories} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input 
            type="number" 
            name="stock_quantity" 
            value={editedProduct.stock_quantity} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">Update Product</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProduct;
