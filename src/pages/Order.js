import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const Order = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_s8zqefq', 'template_w60vccc', form.current, {
        publicKey: 'EuCRs8CSQTukeSkVV',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert('Order placed successfully!');
    reset();
  };

  return (
    <div className="container mt-5">
      <h1>Place Your Order</h1>
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input {...register('name')} className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input {...register('address')} className="form-control" id="address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="payment" className="form-label">Payment Method</label>
          <select {...register('payment')} className="form-control" id="payment" required>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
