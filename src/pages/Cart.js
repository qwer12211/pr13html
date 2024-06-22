import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { useStore } from '../store';
import './Cart.css';
const Cart = () => {
  const { state, dispatch } = useStore();
  const { cart } = state;
  const { register, handleSubmit, reset } = useForm();
  const form = useRef();
  const [message, setMessage] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleRemoveFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const handleOrder = (data) => {
    emailjs.sendForm(
      'service_1aeq8ji', 
      'template_22w50k7', 
      form.current, 
      'CCicSTfj783AdKJoV'
    ).then(
      () => {
        setMessage('Order placed successfully!');
        reset();
      },
      (error) => {
        setMessage(`Failed to place order: ${error.text}`);
      }
    );
  };

  const onSubmit = (data) => {
    handleOrder(data);
  };

  const toggleOrderForm = () => {
    setShowOrderForm(!showOrderForm);
  };

  return (
    <div className="container mt-5">
      <h1>Your Cart</h1>
      <div className="row">
        {cart.map((product) => (
          <motion.div 
            className="col-lg-3 col-md-4 col-sm-6 mb-4" 
            key={product.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card">
              <div className="card-img-top">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(product)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {cart.length > 0 && (
        <button onClick={toggleOrderForm} className="btn btn-primary mt-3">Buy</button>
      )}

      {showOrderForm && (
        <motion.form 
          ref={form} 
          onSubmit={handleSubmit(onSubmit)} 
          className="order-form mt-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Order Form</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input {...register('name')} className="form-control" id="name" name="user_name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input {...register('email')} className="form-control" id="email" name="user_email" type="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="payment" className="form-label">Payment Method</label>
            <select {...register('payment')} className="form-control" id="payment" name="user_payment" required>
              <option value="sberbank">Sberbank</option>
              <option value="tinkoff">Tinkoff</option>
            </select>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="consent" required />
            <label className="form-check-label" htmlFor="consent">Recaptcha</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit Order</button>
          {message && <p className="mt-3">{message}</p>}
        </motion.form>
      )}
    </div>
  );
};

export default Cart;
