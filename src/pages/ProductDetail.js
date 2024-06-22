import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import './ProductDetail.css'; // Импорт стилей для деталей продукта

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleAddToFavorites = () => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{product.name}</h1>
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button className="btn btn-primary me-2" onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
