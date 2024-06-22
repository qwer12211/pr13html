import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import ProductList from '../components/ProductList';
import { useStore } from '../store'; // Import useStore
import './Home.css';

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const form = useRef();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const { dispatch } = useStore(); // Use useStore to get dispatch function

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data.slice(0, 10));
    };

    fetchProducts();
  }, []);

  const sendEmail = (data) => {
    emailjs.sendForm(
      'service_1aeq8ji', 
      'template_1otb7in', 
      form.current, 
      'CCicSTfj783AdKJoV'
    ).then(
      () => {
        setMessage('Message sent successfully!');
        reset();
      },
      (error) => {
        setMessage(`Failed to send message: ${error.text}`);
      }
    );
  };

  const onSubmit = (data) => {
    sendEmail(data);
  };

  const handleAddToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product }); // Dispatch action to add to favorites
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Dispatch action to add to cart
  };

  return (
    <div className="container mt-5">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      
      </motion.h1>
      <p className="shop-info">
      На нашем сайте представлена широкая ассортиментная линейка гарнитур, тщательно подобранных из различных магазинов техники. Мы стремимся предложить нашим клиентам самые качественные и современные модели, которые отвечают различным потребностям и предпочтениям.
      </p>
      <form ref={form} onSubmit={handleSubmit(onSubmit)} className="contact-form mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input {...register('name')} className="form-control" id="name" name="user_name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input {...register('email')} className="form-control" id="email" name="user_email" type="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea {...register('message')} className="form-control" id="message" name="message" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
      <div className="featured-products mt-5">
        <h2>Featured Products</h2>
        <ProductList
          products={products}
          onAddToFavorites={handleAddToFavorites}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default Home;
