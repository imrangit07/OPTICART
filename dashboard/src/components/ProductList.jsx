import React, { useEffect, useState } from 'react';
import '../styles/productList.css';
import axios from 'axios';
import BackendURL from '../config/backendURL';

function ProductList({ handleEdit }) {
  const [products, setProducts] = useState([]);

  const LoadProducts = async () => {
    try {
      const res = await axios.get(`${BackendURL}/admin/getAllProduct`)
      setProducts(res.data.product)
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  useEffect(() => {
    LoadProducts();
  }, []);

  const deleteProduct = async(id)=>{
       try {
        const res = await axios.get(`${BackendURL}/admin/delete/?id=${id}`);
        LoadProducts();
        alert("successfully deleted!")
       } catch (error) {
        console.log(error);
        
       }
  }

  return (
    <div className="product-list">
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.categories}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;