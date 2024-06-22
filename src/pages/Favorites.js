import React from 'react';
import { useStore } from '../store';
import './Favorites.css'; // Импорт стилей для избранного

const Favorites = () => {
  const { state, dispatch } = useStore();
  const { favorites } = state;

  const handleRemoveFromFavorites = (product) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
  };

  return (
    <div className="container mt-5">
      <h1>Favorites</h1>
      <div className="row">
        {favorites.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
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
                  onClick={() => handleRemoveFromFavorites(product)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
