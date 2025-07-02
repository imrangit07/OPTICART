import React, { useState } from 'react';
import '../styles/Home.css';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';

function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', stock: 15 },
    { id: 2, name: 'Smartphone', price: 699, category: 'Electronics', stock: 30 },
    { id: 3, name: 'Headphones', price: 149, category: 'Accessories', stock: 50 }
  ]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <div className="App">
      <Dashboard 
        products={products} 
        addProduct={addProduct} 
        deleteProduct={deleteProduct} 
        updateProduct={updateProduct} 
      />
    </div>
  );
}

export default Home;