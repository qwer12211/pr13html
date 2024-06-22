import React, { createContext, useReducer, useContext } from 'react';

const StoreContext = createContext();

const initialState = {
  favorites: [],
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(product => product.id !== action.payload.id)
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
