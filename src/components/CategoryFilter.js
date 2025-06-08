import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={`category-button ${
            selectedCategory === category ? 'active' : ''
          }`}
          onClick={() => onSelectCategory(category)}
        >
          #
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
