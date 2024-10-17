import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCompanyCategory,
  fetchCategoryStatus,
  fetchSubcategories,
  suspendProduct,
  fetchSearchValue,
  viewDetails,
  setPage,
  resetViewCategoryDetails,
  setViewDetailsPage,
  catForm,
  createCategory,
  bulkSuspend,
  bulkPrice
} from '../features/categorySlice';

const Company = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [background, setBackground] = useState('all');
  const [myValue, setMyValue] = useState('');
  const [more, setMore] = useState(true);
  const [viewingCategoryId, setViewingCategoryId] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [enable, setEnable] = useState(true);
  const [disable, setDisable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [price, setPrice] = useState('');
  const [mode, setMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [catv, setCatv] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoryHierarchy, setCategoryHierarchy] = useState([
    { level: 0, selectedCategory: '', subcategories: [] }
  ]);
  const [after, setAfter] = useState(false);

  

  const dispatch = useDispatch();
  const {
    companyCategory,
    categoryStatus,
    currentPage,
    total_pages,
    isLoading,
    error,
    searchValue,
    viewCategoryDetails,
    viewDetailsPage,
    viewDetailsTotalPages,
    spinItem,
    success,
    catSuccess,
    subCategories,
    cat_name,
    cat_parent_id,
    percentage
  } = useSelector((state) => state.categories);

  let token = localStorage.getItem("key");

  const handleButtonClick = (status) => {
    setBackground(status);
    setFilterStatus(status); // Update the filter status based on the button clicked
  
    // if (status === 'enable') {
    //   setEnable(1, token); // Fetch enabled categories
    // } else if (status === 'disable') {
    //   showDisable(0, token); // Fetch disabled categories
    // } else {
    //   dispatch(fetchCompanyCategory({ token, page: currentPage })); // Fetch all categories
    // }
  };
  

  useEffect(() => {
    if (token) {
      dispatch(fetchCompanyCategory({ token, page: currentPage }));
      setFilterStatus('all');
    }
  }, [dispatch, currentPage, token]);
  

  // Fetch category status (enable/disable)
//   const showEnable = (value, token) => {
//     if (token) {
//       dispatch(fetchCategoryStatus({ token, statusId: value }));
//     }
//   };

//   const showDisable = (value, token) => {
//     if (token) {
//       dispatch(fetchCategoryStatus({ token, statusId: value }));
//     }
//   };

  const changeView = () => {
    setMore(true);
    if (token) {
      dispatch(fetchCompanyCategory({ token, page: currentPage }));
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const getPrice = (e) => {
    setPrice(e.target.value);
  }

  const showModal = () => {
      setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
    setMode(false);
    setAfter(false);
  };

  const newCategory = (e) => {
    e.preventDefault();
    if (inputValue) {
        dispatch(catForm({token, cat_name: inputValue}));
        console.log(inputValue)
        Swal.fire({
            icon: 'success',
            title: 'Category added successfully!',
            showConfirmButton: false,
            timer: 3000
        });
        hideModal();
        dispatch(fetchCompanyCategory({ token, page: currentPage }));
    }else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to add category',
          showConfirmButton: true,
        });
    }
  }

//   useEffect(() => {
//     if (success) {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Category added successfully!',
    //     showConfirmButton: false,
    //     timer: 3000
    //   });

    //   setModalVisible(false);
    //   dispatch(fetchCompanyCategory({ token, page: currentPage }));
//     }
//   }, [success, dispatch, currentPage, token]);

  // Suspend or enable category
  const switchStatus = (id, token) => {
      console.log(id)
    if (token) {
      dispatch(suspendProduct({ token, id }))
        .then((result) => {
          if (result.type === 'categories/suspendProduct/fulfilled') {
            dispatch(fetchCompanyCategory({ token, page: 1 }));
            Swal.fire({
              title: "Success",
              text: "Status changed successfully!",
              icon: "success",
              button: "OK",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong while updating the product!",
            icon: "error",
            confirmButtonText: "OK"
          });
        });
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchSearchValue({ token, searchValue: myValue }));
    }
  }, [dispatch, token, myValue]);

  const myDetails = (id) => {
    setMore(false);
    setIsViewingDetails(true);
    setViewingCategoryId(id);

    dispatch(resetViewCategoryDetails());
    dispatch(setViewDetailsPage(1));

    if (token) {
      dispatch(viewDetails({ token, catId: id, page: 1 }));
    }
  };

  const getCat = (id) => {
      if (token) {
          console.log(id);
          setMode(true);
          dispatch(fetchSubcategories({token, id}))
      }
  }

  const handlePageChange = (page) => {
    if (currentPage !== page) {
      dispatch(setPage(page));
      if (more) {
        dispatch(fetchCompanyCategory({ token, page }));
      }
    }
  };

  const handleViewDetailsPageChange = (page) => {
    if (viewDetailsPage !== page && viewingCategoryId) {
      dispatch(setViewDetailsPage(page));
      dispatch(viewDetails({ token, catId: viewingCategoryId, page }));
    }
  };

  const renderPagination = () => {
    if (!isLoading && total_pages > 1) {
      return (
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
                border: '0',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderViewDetailsPagination = () => {
    if (!isLoading && viewDetailsTotalPages > 1) {
      return (
        <div className="pagination">
          {Array.from({ length: viewDetailsTotalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleViewDetailsPageChange(i + 1)}
              disabled={viewDetailsPage === i + 1}
              className="mx-1"
              style={{
                backgroundColor: '#FF962E',
                borderRadius: '10px',
                border: '0',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };


 const filteredCategories = companyCategory.filter(category => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'enable'
        ? category.categories.status === 1
        : category.categories.status === 0;
  
    const searchInput = myValue ? myValue.toLowerCase().trim() : '';
  
    const matchesSearchValue = searchInput === ''
      ? true
      : category.categories.category_name.toLowerCase().includes(searchInput);
  
    return matchesStatus && matchesSearchValue;
  });
    
  
  // const handleCategoryChange = (event) => {
  //   const selectedValue = event.target.value;
  //   const selectedOption = event.target.options[event.target.selectedIndex].text;

  //   setSelectedCategory(selectedValue);
  //   setSelectedCategoryName(selectedOption);

  //   console.log('Selected Category ID:', selectedValue);
  //   console.log('Selected Category Name:', selectedOption);
  // };


//   const handleCheckboxChange = (id) => {
//     setSelectedCategoryIds((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         // If the ID is already selected, remove it
//         return prevSelected.filter((categoryId) => categoryId !== id);
//       } else {
//         // If the ID is not selected, add it
//         return [...prevSelected, id];
//       }
//     });
//   };

const handleCheckboxChange = (id) => {
    setSelectedCategoryIds((prevSelected) => {
      const updatedSelected = prevSelected.includes(id)
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id];
  
      console.log('Updated Selected Category IDs:', updatedSelected);
      return updatedSelected;
    });
  };

//   const disableAll = (e) => {
//       e.preventDefault();

//       if (token) {
//         dispatch(bulkSuspend({token, cat_idarray: updatedSelected}))
//       }
//   }

const disableAll = async (e) => {
    e.preventDefault();

    if (!selectedCategoryIds || selectedCategoryIds.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please click on the checkbox.',
        confirmButtonColor: '#FF962E'
      });
      return;
    }

    try {
      const result = await dispatch(bulkSuspend({token, cat_idarray: selectedCategoryIds})).unwrap();
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Status',
          text: 'Status Changed Successfully',
          confirmButtonColor: '#FF962E'
        });

        setSelectedCategoryIds([]); 

        setTimeout(() => {
          Swal.close();
          dispatch(fetchCompanyCategory({ token, page: currentPage }));
        }, 3000)
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred during the assignment. Please try again.',
        confirmButtonColor: '#FF962E'
      });
    }
};
  
  

  
  // const CategorySelect = () => {
  //   const renderCategories = (subCategories, indent = 0) => {
  //     return subCategories.map((category) => (
  //       <React.Fragment key={category.id}>
  //         <option
  //           value={category.id}
  //           selected={category.id === selectedCategory}
  //         >
  //           {"-".repeat(indent)} {category.category_name}
  //         </option>
  //         {category.children && category.children.length > 0 &&
  //           renderCategories(category.children, indent + 2)
  //         }
  //       </React.Fragment>
  //     ));
  //   };
  
  //   return (
  //     <select value={selectedCategory} onChange={handleCategoryChange}>
  //       <option value="">Select a category</option>
  //       {renderCategories(subCategories)}
  //     </select>
  //   );
  // };

  const saveToLocalStorage = (selectedId) => {
    localStorage.setItem('selectedCategory', selectedId);
  };

  const handleCategoryChange = async (event, level) => {
    const selectedValue = event.target.value;

    saveToLocalStorage(selectedValue);

    const response = await axios.get(`https://testbackendproject.pluralcode.academy/admin/get_sub_category?cat_id=${selectedValue}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
    },
    });
    const subcategories = response.data;

    const newHierarchy = [...categoryHierarchy];
    newHierarchy[level].selectedCategory = selectedValue;
    newHierarchy[level].subcategories = subcategories;

    if (subcategories.length > 0) {
      newHierarchy[level + 1] = { level: level + 1, selectedCategory: '', subcategories: [] };
    } else {
      newHierarchy.length = level + 1;
    }

    setCategoryHierarchy(newHierarchy);
  };

  const handleSubmit = () => {
    const storedCategory = localStorage.getItem('selectedCategory');
    console.log(storedCategory)
    
    if (catv) {
      dispatch(createCategory({token, cat_name: catv, cat_parent_id: storedCategory}));
      Swal.fire({
        icon: 'success',
        title: 'Category added successfully!',
        showConfirmButton: false,
        timer: 3000
      });

      setCatv('');
      hideModal();
      dispatch(fetchCompanyCategory({ token, page: 1 }));
    }else {
      Swal.fire({
          icon: 'error',
          title: 'Failed to add category',
          showConfirmButton: true,
      });
    }
  }

  const modalPrice = (id) => {
    setAfter(true);
    localStorage.setItem("mp", id);
  }
  
  const changeBulkPrice = async (e) => {
    e.preventDefault();
    const myId = localStorage.getItem("mp");

    if (price === '') {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all the fields.',
        confirmButtonColor: '#FF962E'
      });
      return;
    }

    const priceChange = parseInt(price) / 100;

    try {
      const result = await dispatch(bulkPrice({token, id: myId, percentage: priceChange})).unwrap();

      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Update Successfully',
          text: 'Bulk price update suceessful',
          confirmButtonColor: '#FF962E'
        });

        setTimeout(() => {
          Swal.close();
          hideModal()
          dispatch(fetchCompanyCategory({ token, page: currentPage }));
        }, 3000)
        
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred during the assignment. Please try again.',
        confirmButtonColor: '#FF962E'
      });
    }
  }
  return (
    <>
      {more ? (
        <>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-9">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search Company..."
                  className="search-input"
                  value={myValue}
                  onChange={(e) => setMyValue(e.target.value)}
                />
                <span className="search-icon">&#128269;</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3 mt-3 mt-lg-5">
              <button className="pro-btn" onClick={showModal}>+ Create Company</button>
            </div>
          </div>
  
          <div className="d-flex justify-content-between mt-4 mb-5 mt-lg-4 mb-lg-4">
            <div className="sts-btn p-2">
              <button
                onClick={() => { 
                    handleButtonClick('all');
                    setDisable(true)
                    setEnable(true)
                }}
                style={{
                  backgroundColor: background === 'all' ? '#f6e7d7' : '#fff',
                  color: background === 'all' ? '#FF962E' : 'black',
                  border: '0',
                }}
              >
                All Company
              </button>
              <button
                onClick={() => {
                  handleButtonClick('enable');
                //   showEnable(1, token); 
                setDisable(true)
                setEnable(false)
                }}
                style={{
                  backgroundColor: background === 'enable' ? '#f6e7d7' : '#FFF',
                  color: background === 'enable' ? '#FF962E' : '#6E7079',
                  border: '0',
                }}
              >
                Enable
              </button>
              <button
                onClick={() => {
                  handleButtonClick('disable');
                //   showDisable(0, token); 
                setDisable(false)
                setEnable(true)
                }}
                style={{
                  backgroundColor: background === 'disable' ? '#f6e7d7' : '#FFF',
                  color: background === 'disable' ? '#FF962E' : '#6E7079',
                  border: '0',
                }}
              >
                Disable
              </button>
            </div>
            <div>
                {enable ? (
                  <button className='el2-btn mb-2 mb-lg-0' onClick={disableAll}>Enable</button>
                ) : ''}

                {disable ? (
                  <button className='el2-btn' onClick={disableAll}>Disable</button>
                ) : ''}
            </div>
          </div>
  
          <div className="row">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message || 'Something went wrong'}</div>
            ) : (
                <>
                {filteredCategories?.map((category) => (
                    <div className="col-sm-12 col-md-12 col-lg-4 mb-3" key={category.categories.id}>
                    <div style={{ border: '1px solid #FF962E', borderRadius: '15px', padding: '10px' }}>
                        <div className="d-flex justify-content-between">
                            <label className="custom-checkbox">
                                <input type="checkbox" name="options" checked={selectedCategoryIds.includes(category.categories.id)} 
                                onChange={() => handleCheckboxChange(category.categories.id)} />
                                <span className="checkmark"></span>
                            </label>
                            <button className="el3-btn mt-3" onClick={() => getCat(category.categories.id)}>Subcategories</button>
                            <button className="el3-btn mt-3" onClick={() => myDetails(category.categories.id)}>More</button>
                        </div>
                      
                        <div className="mt-5">
                          <p style={{ marginBottom: '0rem', textAlign: 'center' }}>{category.categories.category_name}</p>
                          <p className={category.categories.status === 1 ? 'enable' : 'disable'} style={{ textAlign: 'center' }}>
                              {category.categories.status === 1 ? 'Enable' : 'Disable'}
                          </p>
                        </div>

                        <div className="text-center">
                          <button className='pro-btn' onClick={() => modalPrice(category.categories.id)}>bulk price change</button>
                        </div>
                        <hr style={{borderTop: '1px dashed #FF962E'}}/>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p>Products</p>
                                <p>{category.products}</p>
                            </div>
                            <div className='mt-3'>
                              <button onClick={() => switchStatus(category.categories.id, token)} className={category.categories.status === 1 ? 'deactivate' : 'activate'}>{category.categories.status === 1 ? 'Disable' : 'Activate'}</button>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
                </>
            )}
            {renderPagination()}
            </div>

        </>
      ) : (
        <div className="view-details-section">
            {/* <button onClick={changeView} style={{ color: '#FF962E' }}>
                &#8592; Back
            </button> */}

            <div className='d-flex gap-2 mt-5 mt-lg-3'>
                <p style={{color: '#FF962E', cursor: 'pointer'}} onClick={changeView}>Company Management</p>
                <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> View Details</p>
            </div>

            <div className="category-details">
                {isLoading ? (
                <p>Loading details...</p>
                ) : error ? (
                <p>Error: {error.message || 'Failed to load details'}</p>
                ) : viewCategoryDetails?.length > 0 ? (
                    viewCategoryDetails.map((detail) => (
                        <div key={detail.id}>
                            <div className="d-block d-lg-flex justify-content-between">
                                <div className='mb-3 doub'>
                                    <p><b>Product Name</b></p>
                                    <small>{detail.product_name}</small>
                                </div>
                                <div className='doub'>
                                    <p><b>Product Price</b></p>
                                    <small>₦{detail.price}</small>
                                </div>
                                <div className='doub'>
                                    <p><b>Product Number</b></p>
                                    <small>{detail.product_number}</small>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className='text-center mb-3'>
                                    <p><b>Product Discount</b></p>
                                    <small>₦{detail.discount}</small>
                                </div>
                                <div className='text-center'>
                                    <p><b>Product Rating</b></p>
                                    <small>{detail.total_rating}</small>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <h5 className='text-center'>Product Images</h5>
                                    <div className="row mt-3">
                                    {detail?.images && detail.images.length > 0 ? (
                                        detail.images.map((image, index) => (
                                            <div className="col-sm-12 col-md-12 col-lg-4" key={index}>
                                                <img src={image.filename} alt="image" className='w-100 w-lg-50'/>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images found</p>
                                    )}

                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <h5 className='text-center'>Product Inches</h5>
                                    {detail?.inches && detail.inches.length > 0 ? (
                                        detail.inches.map((inch, index) => 
                                            <div key={index}>
                                                <div className="d-flex justify-content-between">
                                                    <p>Inches:</p>
                                                    <small>{inch.inche}</small>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Price:</p>
                                                    <small>₦{inch.price}</small>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Discount:</p>
                                                    <small>₦{inch.discount}</small>
                                                </div>
                                                {index !== detail.inches.length - 1 && (
                                                    <hr style={{border: '1px solid #FF962E'}}/>
                                                )}
                                            </div>
                                        )
                                    ) : (
                                        <p className='text-center'>No inches records found</p>
                                    )}

                                </div>
                            </div>
                            <hr style={{border: '1px solid #FF962E'}}/>
                        </div>
                    ))
                ) : (
                <p className='text-center'>No details available for this category.</p>
                )}
            </div>

            {renderViewDetailsPagination()}
        </div>
        )}

        {modalVisible ? (
            <>
             <div className="modal-overlay">
                <div className="modal-content2">
                    <div className="head-mode">
                        <h3> Add Company</h3>
                        <button className="modal-close" onClick={hideModal}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={newCategory}>
                            <div className="form-group">
                                <label htmlFor="category">Create Category</label>
                                <input type="text" name="" placeholder='category name' value={inputValue} onChange={handleChange} className='cat'/>
                                <button className='log-btn mt-5 cat'>
                                    {
                                    spinItem ?(
                                        <>
                                        <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                        <span>Loading... </span>
                                        </>
                                        
                                    ): (
                                        'Add Category'
                                    )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
        ) : ''}

        {mode ? (
            <>
                <div className="modal-overlay">
                    <div className="modal-content2">
                      <div className="head-mode">
                        <h3> Add Subcategories</h3>
                        <button className="modal-close" onClick={hideModal}>
                            &times;
                        </button>
                      </div>
                      <div className="modal-body">
                          <label>Subcategory Name</label>
                          {/* <CategorySelect /> */}
                          {categoryHierarchy.map((categoryLevel, index) => (
                            <div key={index}>
                              <select onChange={(event) => handleCategoryChange(event, index)} value={categoryLevel.selectedCategory} className='mb-3'>
                                <option value="">Select Category</option>
                                {index === 0 &&
                                  subCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                      {category.category_name}
                                    </option>
                                  ))}
                                {index > 0 &&
                                  categoryHierarchy[index - 1].subcategories.map((subcategory) => (
                                    <option key={subcategory.id} value={subcategory.id}>
                                      {subcategory.category_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          ))}

                          <label className='mt-3'>New Name</label>
                          <input type="text" placeholder='category name' value={catv} onChange={(e) => setCatv(e.target.value)}/>

                          <button className='log-btn mt-3' onClick={handleSubmit}>Create Subcategory</button>
                      </div>

                    </div>
                </div>
            </>
        ) : ''}

        {after ? (
          <>
            <div className="modal-overlay">
              <div className="modal-content2">
                <div className="head-mode">
                  <h3>Bulk Price Change</h3>
                  <button className="modal-close" onClick={hideModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={changeBulkPrice}>
                    <input type="text" name="price" placeholder='100%' style={{width: '600px'}} value={price} onChange={getPrice}/>
                    <button className='log-btn mt-5' style={{width: '600px'}}>
                      {
                      spinItem ?(
                          <>
                          <div className="spinner-border spinner-border-sm text-light" role="status">
                            <span className="sr-only"></span>
                          </div>
                          <span>Loading... </span>
                          </>
                          
                      ): (
                          'Add Price Change'
                      )
                      }
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : ''}
        
    </>
  )
}
export default Company;
