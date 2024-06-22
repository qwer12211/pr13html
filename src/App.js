import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Order from './pages/Order';
import { StoreProvider } from './store';
import './App.css';

const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.5 }
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
        <Route path="/catalog" element={<motion.div {...pageTransition}><Catalog /></motion.div>} />
        <Route path="/favorites" element={<motion.div {...pageTransition}><Favorites /></motion.div>} />
        <Route path="/cart" element={<motion.div {...pageTransition}><Cart /></motion.div>} />
        <Route path="/product/:id" element={<motion.div {...pageTransition}><ProductDetail /></motion.div>} />
        <Route path="/order" element={<motion.div {...pageTransition}><Order /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <StoreProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  </StoreProvider>
);

export default App;
