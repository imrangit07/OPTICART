import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './components/DashboardLayout';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import AllOrders from './components/AllOrders';
import Customers from './components/Customers';
import ProtectedRoute from './components/ProtectedRoute';
const admin = localStorage.getItem("admin");


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="customers" element={<Customers />} />
          </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
