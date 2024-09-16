// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Category from './Category';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//     fetchAllProducts, 
//     setPage, 
//     selectProducts, 
//     selectCurrentPage, 
//     selectTotalPages, 
//     selectIsLoading, 
//     selectError,
//     selectProductDetails,
//     getProductDetails,
//     updateProduct
// } from '../../features/allProductSlice';

// const Products = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [inputValues, setInputValues] = useState({
//     productName: '',
//     price: '',
//     discount: '',
//     stock: '',
//     status: '',
//     productDescription: '',
//     category: ''
//   });
//   const [categoryId, setCategoryId] = useState('');

//   const dispatch = useDispatch();

//   const products = useSelector(selectProducts);
//   const currentPage = useSelector(selectCurrentPage);
//   const total_pages = useSelector(selectTotalPages);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);
//   const productDetails = useSelector(selectProductDetails);

//   const [inputGroups, setInputGroups] = useState([
//     { input1: '', input2: '', input3: '' },
//   ]);

//   const handleAddInputGroup = (e) => {
//     e.preventDefault();
//     setInputGroups([...inputGroups, { input1: '', input2: '', input3: '' }]);
//   };

//   const handleRemoveInputGroup = (index) => {
//     const newInputGroups = [...inputGroups];
//     newInputGroups.splice(index, 1);
//     setInputGroups(newInputGroups);
//   };

//   let token = localStorage.getItem("key");

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchAllProducts({ page: currentPage, token }));
//     }
//   }, [dispatch, currentPage, token]);

//   useEffect(() => {
//     if (productDetails) {
//       setInputValues({
//         productName: productDetails.product_name || '',
//         price: productDetails.main_price || '',
//         discount: productDetails.main_price_discount || '',
//         stock: productDetails.stock || '',
//         status: productDetails.status || '',
//         productDescription: productDetails.product_description || '',
//       });
//     }
//     if (productDetails.inches) {
//       setInputGroups(
//         productDetails.inches.map((inch) => ({
//           input1: inch.inche || '', 
//           input2: inch.price || '',
//           input3: inch.discount || ''
//         }))
//       );
//     }
//   }, [productDetails]);

  

//   const handlePageChange = (page) => {
//     if (page !== currentPage) {
//       dispatch(setPage(page));
//     }
//   };

//   const showTheModal = (id, token) => {
//     localStorage.setItem('product', id);
//     setModalVisible(true);
//     dispatch(getProductDetails({ id, token }));
//   };

//   console.log(productDetails)

//   const hideModal = () => {
//     setModalVisible(false);
//   };

//   const updateDetails = (e) => {
//     e.preventDefault();

//     const getId = localStorage.getItem("product");

//     const formData = new FormData();
//     formData.append('product_name', inputValues.productName);
//     formData.append('price', inputValues.price);
//     formData.append('product_description', inputValues.productDescription);
//     formData.append('discount', inputValues.discount);
//     formData.append('stock', inputValues.stock);
//     formData.append('category_id', inputValues.category);
//     formData.append('inches', JSON.stringify(inputGroups));
//     formData.append('status', inputValues.status);
//     formData.append('product_id', getId);

//     dispatch(updateProduct({formData, token}))
//   }

//   return (
//     <>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error?.message || 'Something went wrong'}</div>
//       ) : (
//         <>
//           <div className="outer-wrapper">
//             <div className="table-wrapper">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Product Image</th>
//                     <th>Product Name</th>
//                     <th>Product Price</th>
//                     <th>Product Description</th>
//                     <th>Product Number</th>
//                     <th>Discounts</th>
//                     <th>Total Ratings</th>
//                     <th>Product Settings</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products && products.length > 0 ? (
//                     products.map((product) => (
//                       <tr key={product.id}>
//                         <td>
//                           <img
//                             src={typeof product.images[0]?.filename === 'string' ? product.images[0]?.filename : 'default_image.png'}
//                             alt={product.product_name}
//                             width={100}
//                           />
//                         </td>
//                         <td>{product.product_name}</td>
//                         <td>{product.price}</td>
//                         <td>{product.product_description}</td>
//                         <td>{product.product_number}</td>
//                         <td>{product.discount}</td>
//                         <td>{product.total_rating}</td>
//                         <td style={{ cursor: 'pointer' }}>
//                           <FontAwesomeIcon 
//                             icon={faEdit} 
//                             style={{ color: '#FF962E' }} 
//                             onClick={() => showTheModal(product.id, token)} 
//                           /> 
//                           Edit
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7">No products available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {total_pages > 1 && (
//             <div className="pagination">
//               {Array.from({ length: total_pages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => handlePageChange(i + 1)}
//                   disabled={currentPage === i + 1}
//                   className="mx-1"
//                   style={{
//                     backgroundColor: '#FF962E', 
//                     borderRadius: '10px',
//                     border: '0'
//                   }}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {modalVisible ? (
//         <div className="modal-overlay">
//           <div className="modal-content2">
//             <div className="head-mode">
//               <h3>Update Product</h3>
//               <button className="modal-close" onClick={hideModal}>
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body mt-3">
//               <form className='w-100' onSubmit={updateDetails}>
//                 <div className="row">
//                   <div className="col-sm-12 col-md-12 col-lg-6">
//                     <div className="form-group mb-4">
//                       <label>Product Name</label>
//                       <input 
//                         type="text" 
//                         placeholder='legit hair' 
//                         value={inputValues.productName}
//                         onChange={(e) => setInputValues({ ...inputValues, productName: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-12 col-md-12 col-lg-6">
//                     <div className="form-group">
//                       <label>Price</label>
//                       <input 
//                         type="number" 
//                         placeholder='40000' 
//                         value={inputValues.price}
//                         onChange={(e) => setInputValues({ ...inputValues, price: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-12 col-md-12 col-lg-6">
//                     <div className="form-group">
//                       <label>Product Discount</label>
//                       <input 
//                         type="number" 
//                         placeholder='40000' 
//                         value={inputValues.discount}
//                         onChange={(e) => setInputValues({ ...inputValues, discount: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-12 col-md-12 col-lg-6">
//                     <div className="form-group">
//                       <label>Stock</label>
//                       <input 
//                         type="number" 
//                         placeholder='40000'
//                         value={inputValues.stock}
//                         onChange={(e) => setInputValues({ ...inputValues, stock: e.target.value })}
//                       />
//                     </div>
//                   </div>


//                   <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
//                   <div className="row my-3">
//                       {/* {productDetails?.images.map((image) => 
//                          <div className="col-sm-12 col-md-12 col-lg-4">
//                            <img src={image.filename} alt={image.filename} className="w-100"/>
//                          </div>
//                       )} */}
//                     </div>
//                     {/* <div className="form-group">
//                       <label>Product Images</label>
//                       <input type="file" multiple />
//                     </div> */}
//                   </div>
//                   <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
//                     <div className="form-group">
//                       <label>Status</label>
//                       <input 
//                         type="text" 
//                         placeholder='pending'
//                         value={inputValues.status}
//                         onChange={(e) => setInputValues({ ...inputValues, status: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
//                     <div className="form-group">
//                       <label>Product Description</label>
//                       <textarea 
//                         cols="30" 
//                         rows="5"
//                         value={inputValues.productDescription}
//                         onChange={(e) => setInputValues({ ...inputValues, productDescription: e.target.value })}
//                       ></textarea>
//                     </div>
//                   </div>
                  // <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                  //   <div className="form-group">
                  //     <div className="d-flex justify-content-between mb-3">
                  //       <label htmlFor="exampleInputPassword1">Inches</label>
                  //       <button
                  //         onClick={handleAddInputGroup}
                  //         style={{
                  //           outline: 'none',
                  //           background: 'none',
                  //           color: '#FF962E',
                  //           fontSize: '25px',
                  //           padding: '0',
                  //           border: '0',
                  //         }}
                  //       >
                  //         +
                  //       </button>
                  //     </div>
                  //     {inputGroups.map((inputGroups, index) => (
                  //       <div key={index} style={{ marginBottom: '20px' }} className="d-flex">
                  //         <input
                  //           type="text"
                  //           name="input1"
                  //           value={inputGroups.input1 || ''}
                  //           onChange={(e) => {
                  //             const newInputGroups = [...inputGroups];
                  //             newInputGroups[index] = { ...newInputGroups[index], input1: e.target.value };
                  //             setInputGroups(newInputGroups);
                  //           }}
                  //           placeholder="Inches"
                  //           className="mx-2"
                  //         />
                  //         <input
                  //           type="number"
                  //           name="input2"
                  //           value={inputGroups.input2 || ''}
                  //           onChange={(e) => {
                  //             const newInputGroups = [...inputGroups];
                  //             newInputGroups[index] = { ...newInputGroups[index], input2: e.target.value };
                  //             setInputGroups(newInputGroups);
                  //           }}
                  //           placeholder="Price"
                  //           className="mx-2"
                  //         />
                  //         <input
                  //           type="number"
                  //           name="input3"
                  //           value={inputGroups.input3 || ''}
                  //           onChange={(e) => {
                  //             const newInputGroups = [...inputGroups];
                  //             newInputGroups[index] = { ...newInputGroups[index], input3: e.target.value };
                  //             setInputGroups(newInputGroups);
                  //           }}
                  //           placeholder="Discount"
                  //           className="mx-2"
                  //         />
                  //         <FontAwesomeIcon
                  //           icon={faTimes}
                  //           onClick={() => handleRemoveInputGroup(index)}
                  //           style={{ color: '#FF962E' }}
                  //         />
                  //       </div>
                  //     ))}
                  //   </div>
                  // </div>

//                   <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
//                  <div className="form-group">
//                      <label htmlFor="exampleInputPassword1">Categories</label>
//                      <Category onCategoryChange={inputValues.category} selectedCategory={productDetails?.category_id || ''}/>
//                  </div>
//                </div>
//                 </div>
//                 <button className='log-btn mt-5'> Update Product </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default Products;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import Category from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAllProducts, 
    setPage, 
    selectProducts, 
    selectCurrentPage, 
    selectTotalPages, 
    selectIsLoading, 
    selectError,
    selectProductDetails,
    getProductDetails,
    updateProduct
} from '../../features/allProductSlice';

const Products = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    productName: '',
    price: '',
    discount: '',
    stock: '',
    status: '',
    productDescription: '',
    category: ''
  });
  const [categoryId, setCategoryId] = useState('');

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const currentPage = useSelector(selectCurrentPage);
  const total_pages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const productDetails = useSelector(selectProductDetails);

  const [inputGroups, setInputGroups] = useState([
    { input1: '', input2: '', input3: '' },
  ]);

  const handleAddInputGroup = (e) => {
    e.preventDefault();
    setInputGroups([...inputGroups, { inche: '', price: '', discount: '' }]);
  };

  const handleRemoveInputGroup = (index) => {
    const newInputGroups = [...inputGroups];
    newInputGroups.splice(index, 1);
    setInputGroups(newInputGroups);
  };

  let token = localStorage.getItem("key");

  useEffect(() => {
    if (token) {
      dispatch(fetchAllProducts({ page: currentPage, token }));
    }
  }, [dispatch, currentPage, token]);

  useEffect(() => {
    if (productDetails) {
      setInputValues({
        productName: productDetails.product_name || '',
        price: productDetails.main_price || '',
        discount: productDetails.main_price_discount || '',
        stock: productDetails.stock || '',
        status: productDetails.status || '',
        productDescription: productDetails.product_description || '',
        category: productDetails.category_id || '',
      });
    }
    if (productDetails.inches) {
      setInputGroups(
        productDetails.inches.map((inch) => ({
          inche: inch.inche || '', 
          price: inch.price || '',
          discount: inch.discount || ''
        }))
      );
    }
  }, [productDetails]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const showTheModal = (id, token) => {
    localStorage.setItem('product', id);
    setModalVisible(true);
    dispatch(getProductDetails({ id, token }));
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const updateDetails = (e) => {
    e.preventDefault();

    const getId = localStorage.getItem("product");

    const formData = new FormData();

    formData.append('product_name', inputValues.productName);
    formData.append('price', inputValues.price);
    formData.append('product_description', inputValues.productDescription);
    formData.append('discount', inputValues.discount);
    formData.append('stock', inputValues.stock);
    formData.append('category_id', categoryId);
    formData.append('inches', JSON.stringify(inputGroups));
    formData.append('status', inputValues.status);
    formData.append('product_id', getId);

    console.log(inputValues.productName, inputGroups, getId, categoryId)

    dispatch(updateProduct({formData, token}));
  };

  const handleCategoryChange = (category) => {
    setInputValues({ ...inputValues, category });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error?.message || 'Something went wrong'}</div>
      ) : (
        <>
          <div className="outer-wrapper">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th>Product Number</th>
                    <th>Discounts</th>
                    <th>Total Ratings</th>
                    <th>Product Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={typeof product.images[0]?.filename === 'string' ? product.images[0]?.filename : 'default_image.png'}
                            alt={product.product_name}
                            width={100}
                          />
                        </td>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td>{product.product_description}</td>
                        <td>{product.product_number}</td>
                        <td>{product.discount}</td>
                        <td>{product.total_rating}</td>
                        <td style={{ cursor: 'pointer' }}>
                          <FontAwesomeIcon 
                            icon={faEdit} 
                            style={{ color: '#FF962E' }} 
                            onClick={() => showTheModal(product.id, token)} 
                          /> 
                          Edit
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {total_pages > 1 && (
            <div className="pagination">
              {Array.from({ length: total_pages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                  className="mx-1"
                  style={{
                    backgroundColor: '#FF962E', 
                    borderRadius: '10px',
                    border: '0'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {modalVisible ? (
        <div className="modal-overlay">
          <div className="modal-content2">
            <div className="head-mode">
              <h3>Update Product</h3>
              <button className="modal-close" onClick={hideModal}>
                &times;
              </button>
            </div>

            <div className="modal-body mt-3">
              <form className='w-100' onSubmit={updateDetails}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group mb-4">
                      <label>Product Name</label>
                      <input 
                        type="text" 
                        placeholder='Product name' 
                        value={inputValues.productName}
                        onChange={(e) => setInputValues({ ...inputValues, productName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label>Price</label>
                      <input 
                        type="number" 
                        placeholder='Price' 
                        value={inputValues.price}
                        onChange={(e) => setInputValues({ ...inputValues, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label>Product Discount</label>
                      <input 
                        type="number" 
                        placeholder='Discount' 
                        value={inputValues.discount}
                        onChange={(e) => setInputValues({ ...inputValues, discount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label>Stock</label>
                      <input 
                        type="number" 
                        placeholder='Stock'
                        value={inputValues.stock}
                        onChange={(e) => setInputValues({ ...inputValues, stock: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                    <div className="form-group">
                      <label>Status</label>
                      <input 
                        type="text" 
                        placeholder='Status'
                        value={inputValues.status}
                        onChange={(e) => setInputValues({ ...inputValues, status: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                    <div className="form-group">
                      <label>Product Description</label>
                      <textarea 
                        cols="30" 
                        rows="5"
                        value={inputValues.productDescription}
                        onChange={(e) => setInputValues({ ...inputValues, productDescription: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                    <div className="form-group">
                      <label>Category</label>
                      <Category 
                        onCategoryChange={setCategoryId} 
                        selectedCategory={inputValues.category || ''}
                      />
                    </div>
                  </div>

                  {/* <div className="col-sm-12 mt-4">
                    <div className="form-group">
                      <label>Product Measurements (Inches)</label>
                      {inputGroups.map((group, index) => (
                        <div key={index} className="input-group mb-3">
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Inches"
                            value={group.input1}
                            onChange={(e) => {
                              const newGroups = [...inputGroups];
                              newGroups[index].input1 = e.target.value;
                              setInputGroups(newGroups);
                            }}
                          />
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Price"
                            value={group.input2}
                            onChange={(e) => {
                              const newGroups = [...inputGroups];
                              newGroups[index].input2 = e.target.value;
                              setInputGroups(newGroups);
                            }}
                          />
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Discount"
                            value={group.input3}
                            onChange={(e) => {
                              const newGroups = [...inputGroups];
                              newGroups[index].input3 = e.target.value;
                              setInputGroups(newGroups);
                            }}
                          />
                          <div className="input-group-append">
                            <button 
                              className="btn btn-danger" 
                              type="button" 
                              onClick={() => handleRemoveInputGroup(index)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-primary" onClick={handleAddInputGroup}>
                        Add Measurement
                      </button>
                    </div>
                  </div> */}
                  <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                    <div className="form-group">
                      <div className="d-flex justify-content-between mb-3">
                        <label htmlFor="exampleInputPassword1">Inches</label>
                        <button
                          onClick={handleAddInputGroup}
                          style={{
                            outline: 'none',
                            background: 'none',
                            color: '#FF962E',
                            fontSize: '25px',
                            padding: '0',
                            border: '0',
                          }}
                        >
                          +
                        </button>
                      </div>
                      {inputGroups.map((inputGroups, index) => (
                        <div key={index} style={{ marginBottom: '20px' }} className="d-flex">
                          <input
                            type="text"
                            name="input1"
                            value={inputGroups.inche || ''}
                            onChange={(e) => {
                              const newInputGroups = [...inputGroups];
                              newInputGroups[index] = { ...newInputGroups[index], inche: e.target.value };
                              setInputGroups(newInputGroups);
                            }}
                            placeholder="Inches"
                            className="mx-2"
                          />
                          <input
                            type="number"
                            name="input2"
                            value={inputGroups.price || ''}
                            onChange={(e) => {
                              const newInputGroups = [...inputGroups];
                              newInputGroups[index] = { ...newInputGroups[index], price: e.target.value };
                              setInputGroups(newInputGroups);
                            }}
                            placeholder="Price"
                            className="mx-2"
                          />
                          <input
                            type="number"
                            name="input3"
                            value={inputGroups.discount || ''}
                            onChange={(e) => {
                              const newInputGroups = [...inputGroups];
                              newInputGroups[index] = { ...newInputGroups[index], discount: e.target.value };
                              setInputGroups(newInputGroups);
                            }}
                            placeholder="Discount"
                            className="mx-2"
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => handleRemoveInputGroup(index)}
                            style={{ color: '#FF962E' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>


                 <button className='log-btn mt-5'> Update Product </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Products;


