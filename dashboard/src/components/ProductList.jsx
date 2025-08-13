import React, { useEffect, useState } from 'react';
import '../styles/productList.css';
import axios from 'axios';
import BackendURL from '../config/backendURL';
import { FiEdit2, FiTrash2, FiPlus, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Zoom, toast } from "react-toastify";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${BackendURL}/admin/getAllProduct`);
      setProducts(res.data.product);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteClick = (id) => {

    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.get(`${BackendURL}/admin/delete/?id=${productToDelete}`);
      loadProducts();
      toast.success("Product deleted successfully!", { transition: Zoom, style: { fontSize: '16px', } });
      setDeleteModalOpen(false);

    } catch (error) {

      setDeleteModalOpen(false);
      toast.error("Failed to delete product. Please try again.", { transition: Zoom, style: { fontSize: '16px', } });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    navigate(`/dashboard/edit/${product._id}`);
  };

  const handleAddProduct = () => {
    navigate('/dashboard/add');
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete "{productName}"? This action cannot be undone.</p>
          <div className="modal-actions">
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button onClick={onConfirm} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-management">
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ''}
      />

      <div className="product-header">
        <h2>Product Management</h2>
        <button onClick={handleAddProduct} className="add-product-btn">
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <FiLoader className="spinner" />
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadProducts}>Retry</button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products found.</p>
          <button onClick={handleAddProduct} className="add-product-btn">
            <FiPlus /> Add Your First Product
          </button>
        </div>
      ) : (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-image">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>{product.categories}</td>
                  <td className={product.stock_quantity <= 0 ? 'out-of-stock' : ''}>
                    {product.stock_quantity <= 0 ? 'Out of Stock' : product.stock_quantity}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(product)}
                        className="edit-btn"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="delete-btn"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;