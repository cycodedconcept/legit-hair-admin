// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from '../../features/categorySlice';

// const Category = ({ onCategoryChange }) => {  
//   const dispatch = useDispatch();
//   const { categories, isLoading, error } = useSelector((state) => state.categories);
//   const token = localStorage.getItem('key');
//   const [selectedCategory, setSelectedCategory] = useState('');


//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCategories(token));
//     }
//   }, [dispatch, token]);

//   const renderCategoryOptions = (categoryList, level = 0) => {
//     return categoryList.map((category) => (
//       <React.Fragment key={category.id}>
//         <option value={category.id}>
//           {`${'--'.repeat(level)} ${category.name}`} {/* Indentation based on level */}
//         </option>
//         {category.children && category.children.length > 0 &&
//           renderCategoryOptions(category.children, level + 1)}
//       </React.Fragment>
//     ));
//   };
  

//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     setSelectedCategory(value);
//     onCategoryChange(value);
//     console.log('Selected Category ID:', e.target.value);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <select value={selectedCategory} onChange={handleCategoryChange}>
//         <option value="">-- Select a Category --</option>
//         {categories && renderCategoryOptions(categories)}
//       </select>
//       {selectedCategory && <p>Selected Category ID: {selectedCategory}</p>}
//     </>
//   )
// }

// export default Category

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from '../../features/categorySlice';

// const Category = ({ onCategoryChange, selectedCategory }) => {  
//   const dispatch = useDispatch();
//   const { categories, isLoading, error } = useSelector((state) => state.categories);
//   const token = localStorage.getItem('key');
  
//   const [selected, setSelected] = useState(selectedCategory);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCategories(token));
//     }
//   }, [dispatch, token]);

//   // Update selected category when selectedCategory prop changes
//   useEffect(() => {
//     setSelected(selectedCategory);
//   }, [selectedCategory]);

//   const renderCategoryOptions = (categoryList, level = 0) => {
//     return categoryList.map((category) => (
//       <React.Fragment key={category.id}>
//         <option value={category.id}>
//           {`${'--'.repeat(level)} ${category.name}`} {/* Indentation based on level */}
//         </option>
//         {category.children && category.children.length > 0 &&
//           renderCategoryOptions(category.children, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     setSelected(value);
//     onCategoryChange(value);
//     console.log('Selected Category ID:', e.target.value);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <select value={selected} onChange={handleCategoryChange}>
//         <option value="">-- Select a Category --</option>
//         {categories && renderCategoryOptions(categories)}
//       </select>
//       {selected && <p>Selected Category ID: {selected}</p>}
//     </>
//   );
// }

// export default Category;

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';

const Category = ({ onCategoryChange, selectedCategory }) => {  
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const token = localStorage.getItem('key');
  const [localSelectedCategory, setLocalSelectedCategory] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    // Set local selected category based on passed prop
    if (selectedCategory) {
      setLocalSelectedCategory(selectedCategory);
    }
  }, [selectedCategory]);

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
    const value = e.target.value;
    setLocalSelectedCategory(value);  // Update local state
    onCategoryChange(value);  // Notify parent about the change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <select value={localSelectedCategory} onChange={handleCategoryChange}>
        <option value="">-- Select a Category --</option>
        {categories && renderCategoryOptions(categories)}
      </select>
      {localSelectedCategory && <p>Selected Category ID: {localSelectedCategory}</p>}
    </>
  )
}

export default Category;


