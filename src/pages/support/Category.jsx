import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';

const Category = () => {  
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const token = localStorage.getItem('key');
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    if (token) {
      dispatch(fetchCategories(token));
    }
  }, [dispatch, token]);

  const renderCategoryOptions = (categoryList, level = 0) => {
    return categoryList.map((category) => (
      <React.Fragment key={category.id}>
        <option value={category.id}>
          {`${'--'.repeat(level)} ${category.name}`} {/* Indentation based on level */}
        </option>
        {category.children && category.children.length > 0 &&
          renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  };
  

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log('Selected Category ID:', e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">-- Select a Category --</option>
        {categories && renderCategoryOptions(categories)}
      </select>
      {selectedCategory && <p>Selected Category ID: {selectedCategory}</p>}
    </>
  )
}

export default Category
