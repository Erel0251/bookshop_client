import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Header from './components/ui/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
