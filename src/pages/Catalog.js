import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import ProductList from '../components/ProductList';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { dispatch } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5'
  ];

  const categorizeProducts = (products) => {
    return products.map((product, index) => {
      if (index < 5) return { ...product, category: 'Category 1' };
      if (index < 10) return { ...product, category: 'Category 2' };
      if (index < 12) return { ...product, category: 'Category 3' };
      if (index < 16) return { ...product, category: 'Category 4' };
      return { ...product, category: 'Category 5' };
    });
  };

  const categorizedProducts = categorizeProducts(products);

  const filteredProducts = categorizedProducts.filter(product => {
    const matchesSearchTerm = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      !selectedCategory || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <h1>Catalog</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mb-4">
        <select 
          className="form-control"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ProductList
        products={filteredProducts}
        onAddToFavorites={handleAddToFavorites}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Catalog;
