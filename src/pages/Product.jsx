import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails, selectSearchDetails, setCurrentPage, selectCurrentPage, selectTotalPages, selectViewDetails, viewCategory, getProductDetails, updateProduct, } from '../features/allProductSlice';
import { fetchCategories } from '../features/categorySlice';
import Products from './support/Products';
import AddProduct from './support/AddProduct';


import { Exp } from '../assets/images';
import './pages.css'

const Product = () => {

  const [pro, setPro] = useState(true);
  const [form, setForm] = useState(false);
  const [search, setSearch] = useState(true);
  const [dt, setDt] = useState(true);
  const [pr, setPr] = useState(false);
  const [myValue, setMyValue] = useState('')
  const [wal, setWal] = useState(false);
  const [selectId, setSelectedId] = useState('');
  const [alter, setAlter] = useState(true);



  const searchDetails = useSelector(selectSearchDetails);
  const currentPage = useSelector(selectCurrentPage);
  const total_pages = useSelector(selectTotalPages);
  const viewDetails = useSelector(selectViewDetails);


  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  let token = localStorage.getItem("key");

  useEffect(() => {
    if (token) {
      setPro(false)
      if(myValue === '') {
        setPro(true);
        setWal(false)
      }
      else {
        setWal(true)
        setAlter(true);
        dispatch(fetchDetails({ token, searchValue: myValue }));
      }
    }
  }, [dispatch, token, myValue]);


  useEffect(() => {
    if (token) {
      dispatch(fetchCategories(token));
    }
  }, [dispatch, token]);

  const resetPage = () => {
    dispatch(setCurrentPage(1));
  };

  const showProductForm = (e) => {
    e.preventDefault();
    setPro(false)
    setSearch(false)
    setDt(false)
    setForm(true)
    setPr(true)
    setWal(false)
  }

  const original = (e) => {
    e.preventDefault();
    setPro(true)
    setSearch(true)
    setDt(true)
    setForm(false)
    setPr(false)
    setWal(false)
  }

  const pickChange = (e) => {
    const categoryId = e.target.value;
    setPro(false);
    setWal(true);
    setAlter(false);
    setSelectedId(categoryId);
    resetPage();
    console.log(categoryId);

     
    if (categoryId && token) {
      console.log("Dispatching viewDetails with:", { token, id: categoryId, page: currentPage });
      dispatch(viewCategory({ token, id: categoryId, page: 1 }));
    }
  };


  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));

    if (alter) {
      dispatch(fetchDetails({ token, searchValue: myValue, page }));
    } else {
      dispatch(viewCategory({ token, id: selectId, page }));
    }
  };

  const renderCategoryOptions = (categories) => {
    return categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name} (Parent ID: {category.parent_category_id ?? 'None'})
      </option>
    ));
  };

  
  return (
    <>
    {pr ? (
      <div className="pro-header d-flex justify-content-between mt-3">
      <div className='d-flex gap-2 mt-3'>
        <p style={{color: '#FF962E'}}>Product</p>
        <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> Add Product</p>
      </div>

      <button className='pcancel' onClick={original}><FontAwesomeIcon icon={faTimes} style={{color: '#888', marginRight: '8px'}}/>Cancel</button>
    </div>
    ): ''}
    
    {search ? (
      <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-5">
        <div className="search-container">
          <input type="text" placeholder="Search Order..." className="search-input" value={myValue} onChange={(e) => setMyValue(e.target.value)}/>
          <span className="search-icon">&#128269;</span>
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-4">
        <div className='mt-2'>
          <select value={selectId} onChange={pickChange}>
            <option value="">Select a Category</option>
            {categories && renderCategoryOptions(categories)}
          </select>
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-3 mt-3 mb-4 text-left">
        <button className='pro-btn' onClick={showProductForm}>+ Add Products</button>
      </div>
      </div>
    ): ''}
      
    {dt ? (
      <div className="scub d-flex">
      {/* <div className="pro d-flex ml-5">
          {getMyStatus}
      </div> */}
      <div className="pro-right d-flex mt-2">
      
      </div>
    </div>
    ): ''}  
      

      {pro ? (
        <Products />
      ) : ''}


      {form ? (
        <AddProduct />
      ): ''}

      {wal ? (
        <div>
          <table className="my-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th style={{width: '250px'}}>Product Name</th>
                <th>Product Price</th>
                <th>Discounts</th>
                <th>Product Number</th>
                <th>Status Setting</th>
                <th>Product Settings</th>
              </tr>
            </thead>
            <tbody>
            {alter ? (
              searchDetails && searchDetails.data?.length > 0 ? (
                searchDetails.data.map((search) => (
                  <tr key={search.id}>
                    <td>
                      <img
                        src={typeof search.images[0]?.filename === 'string' ? search.images[0]?.filename : 'default_image.png'}
                        width={80} className="img-thumbnail" alt="Thumbnail" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                      />
                    </td>
                    <td style={{textAlign: 'left'}}>{search.product_name}</td>
                    <td>{search.price}</td>
                    <td>{search.discount}</td>
                    <td>{search.product_number}</td>
                    <td><button className='btn-status' onClick={() => switchStatus(search.id, token)}>Change Status</button></td>
                    <td style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        style={{ color: '#FF962E' }} 
                        onClick={() => showTheModal(search.id, token)} 
                      /> 
                      Edit
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No products available</td>
                </tr>
              )
            ) : (
              viewDetails && viewDetails.data?.length > 0 ? (
                viewDetails.data.map((view) => (
                  <tr key={view.id}>
                    <td>
                      <img
                        src={typeof view.images[0]?.filename === 'string' ? view.images[0]?.filename : 'default_image.png'}
                        width={80} className="img-thumbnail" alt="Thumbnail" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                      />
                    </td>
                    <td style={{textAlign: 'left'}}>{view.product_name}</td>
                    <td>₦{Number(view.price).toLocaleString()}</td>
                    <td>₦{Number(view.discount).toLocaleString()}</td>
                    <td>{view.product_number}</td>
                    <td><button className='btn-status' onClick={() => switchStatus(view.id, token)}>Change Status</button></td>
                    <td style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        style={{ color: '#FF962E' }} 
                        onClick={() => showTheModal(view.id, token)} 
                      /> 
                      Edit
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No products available</td>
                </tr>
              )
            )}

            </tbody>
          </table>

        {total_pages > 1 && (
            <div className="pagination">

              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="mx-1"
                  style={{
                    backgroundColor: '#FF962E',
                    borderRadius: '10px',
                    border: '0',
                  }}
                >
                  {currentPage - 1}
                </button>
              )}


              <button
                onClick={() => handlePageChange(currentPage)}
                disabled
                className="mx-1"
                style={{
                  backgroundColor: '#FF962E',
                  borderRadius: '10px',
                  border: '0',
                }}
              >
                {currentPage}
              </button>

              {currentPage < total_pages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="mx-1"
                  style={{
                    backgroundColor: '#FF962E',
                    borderRadius: '10px',
                    border: '0',
                  }}
                >
                  {currentPage + 1}
                </button>
              )}

              {currentPage < total_pages - 1 && <span className="mx-1">...</span>}
            </div>
          )}
        </div>
      ): ''}
    
      
    </>
  )
}

export default Product
