import React from 'react';
import './ProductList.css'; // Импорт стилей для списка продуктов

const ProductList = ({ products, onAddToFavorites, onAddToCart }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
          <div className="card">
            <div className="card-img-top">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => onAddToFavorites(product)}
              >
                Add to Favorites
              </button>
              <button
                className="btn btn-success"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
