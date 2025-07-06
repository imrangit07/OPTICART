import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin";
import Layout from "./Layout";

function App() {
 

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element={<AdminLogin />}/>
    <Route path="dashboard" element={<Home/> } />
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;