import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Home } from './Home';
import { Products } from './Products';
import { Blog } from './Blog';
import { Contact } from './Contact';
import { JoinUs } from './JoinUs';

// Placeholder components for other pages
const ContactPage = () => (
  <Contact />
);

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
