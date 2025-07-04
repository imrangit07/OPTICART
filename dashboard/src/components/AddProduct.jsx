import React, { useState } from 'react';
import '../styles/addProduct.css';
import BackendURL from '../config/backendURL';
import axios from 'axios'

function AddProduct({ addProduct, setActiveView }) {
  const [product, setProduct] = useState({});
  const [selectedImages, setSelectedImages] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  // console.log(product);


  const handleImages = (e) => {
    setSelectedImages(Array.from(e.target.files));
  }
  // console.log(selectedImages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert('Please select at least one file');
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


      const res = await axios.post(`${BackendURL}/admin/addproduct`,
        formData);
      console.log(res.data);
      alert("add successfully")
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }

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
          <label>Product Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
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
          <label>Unique Code (SKU)</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Product Quanitity</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
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
            value={product.categories}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>color</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Add Product Image</label>
          <input
            type="number"
            name="ratings"
            value={product.images}
            onChange={handleImages}
            multiple
            required
          />
        </div> */}
        <div className="form-group">
          <label>Add Product Image</label>
          <input
            type="file"
            name="images"
            value={product.images}
            onChange={handleImages}
            multiple
            required
          />
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? (
            <>
              Uploading
              <span className="spinner"></span>
            </>
          ) : (
            'Add Product'
          )}
        </button>
        <button type="button" onClick={() => setActiveView('products')}>Cancel</button>
      </form>

    </div>
  );
}

export default AddProduct;
