import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Header from './components/ui/Header';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Product from './pages/Product';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Box } from '@mui/material';
import SignIn from './pages/Login';
import SignUp from './pages/Signup';
import CheckOut from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
