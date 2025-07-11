import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from "./Layout"
import Home from './pages/Home/Home';
import Pages from './pages/Pages';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Payment from './pages/payment/Payment';
import MyOrder from './pages/MyOrder/MYOrder';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/> }>
      <Route index element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/pages' element={<Pages/>} />
      <Route path='/blog' element={<Blog/>} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/portfolio' element={<Portfolio/>} />
      <Route path='/contact' element={<Contact/>} />

      <Route path='/cart' element={<Cart/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/myorders' element={<MyOrder/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App