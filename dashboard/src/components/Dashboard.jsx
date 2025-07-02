import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import '../styles/dashboard.css';

function Dashboard({ products, addProduct, deleteProduct, updateProduct }) {
  const [activeView, setActiveView] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setActiveView('edit');
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveView={setActiveView} />
      <div className="main-content">
        {activeView === 'products' && (
          <ProductList 
            products={products} 
            deleteProduct={deleteProduct} 
            handleEdit={handleEdit} 
          />
        )}
        {activeView === 'add' && <AddProduct addProduct={addProduct} setActiveView={setActiveView} />}
        {activeView === 'edit' && (
          <EditProduct 
            product={editingProduct} 
            updateProduct={updateProduct} 
            setActiveView={setActiveView} 
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;