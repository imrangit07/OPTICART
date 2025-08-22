import React, { useState } from 'react';
import '../styles/addProduct.css';
import BackendURL from '../config/backendURL';
import axios from 'axios';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
import { Zoom, toast } from "react-toastify";


function AddProduct({ addProduct, setActiveView }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    stock_quantity: '',
    categories: '',
    color: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for price
    if (Number(product.price) <= 0) {
      toast.error("Price must be greater than 0", { transition: Zoom, style: { fontSize: '16px' } });
      return;
    }

    // Validation for quantity
    if (Number(product.stock_quantity) <= 0) {
      toast.error("Quantity must be greater than 0", { transition: Zoom, style: { fontSize: '16px' } });
      return;
    }
    // Validation for images
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image", { transition: Zoom, style: { fontSize: '16px', } });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      // Add all product fields
      for (let key in product) {
        formData.append(key, product[key]);
      }

      // Add all selected images
      selectedImages.forEach((file) => {
        formData.append("image", file);
      });

      const res = await axios.post(`${BackendURL}/admin/addproduct`, formData);

      toast.success("Product added successfully", { transition: Zoom, style: { fontSize: '16px', } });

      setProduct({
        name: '',
        description: '',
        price: '',
        sku: '',
        stock_quantity: '',
        categories: '',
        color: ''
      });
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (error) {
      toast.error("Error adding product", { transition: Zoom, style: { fontSize: '16px', } });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <button onClick={() => setActiveView('products')} className="back-button">
          <FiArrowLeft /> Back to Products
        </button>
        <h2>Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>SKU (Unique Code) *</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
              placeholder="Enter product SKU"
            />
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="stock_quantity"
              value={product.stock_quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="categories"
              value={product.categories}
              onChange={handleChange}
              required
              placeholder="Enter category"
            />
          </div>

          <div className="form-group">
            <label>Color *</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              required
              placeholder="Enter color"
            />
          </div>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label>Product Images *</label>
            <div className="image-upload-container">
              <label className="upload-area">
                <FiUpload className="upload-icon" />
                <span>Click to upload or drag and drop</span>
                <input
                  type="file"
                  name="images"
                  onChange={handleImages}
                  multiple
                  required
                  className="file-input"
                  accept="image/*"
                />
              </label>

              {previewImages.length > 0 && (
                <div className="image-previews">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="image-preview">
                      <img src={preview} alt={`Preview ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => setActiveView('products')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="submit-button"
          >
            {isUploading ? 'Uploading...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
