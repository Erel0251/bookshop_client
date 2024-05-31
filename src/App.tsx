import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Header from './components/ui/Header';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Product from './pages/Product';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
