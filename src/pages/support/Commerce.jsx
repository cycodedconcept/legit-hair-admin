import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productItem, setPageProduct } from '../../features/orderSlice';
import { getProductDetails } from '../../features/allProductSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from './ImageCarousel'


const Commerce = () => {
  const token = localStorage.getItem("key");
  let maxLength = 20;

  const dispatch = useDispatch();
  const { isLoading, error, product, productPage, productTotalPages} = useSelector((state) => state.order);
  const { productDetails } = useSelector((state) => state.allProducts);

  const [details, setDetails] = useState(true);
 
  useEffect(() => {
    if (token) {
        dispatch(productItem({token, page: productPage}))
    }
  }, [dispatch, token, productPage]);

  const handlePageChange = (page) => {
    dispatch(setPageProduct(page));
  };

  const proDetails = (id) => {
      if (token) {
          console.log(id)
        dispatch(getProductDetails({id: id, token}));
        setDetails(false)
      }
  }

  const changeProduct = () => {
    setDetails(true);
  }


  const renderProductPagination = () => {
    if (!isLoading && productTotalPages) {
        return (
            <div className="pagination">
                {productPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="mx-1"
                            style={{
                                backgroundColor: '#FF962E',
                                borderRadius: '10px',
                                border: '0',
                            }}
                        >
                            1
                        </button>
                        {productPage > 3 && <span>...</span>}
                    </>
                )}

                {productPage > 2 && (
                    <button
                        onClick={() => handlePageChange(productPage - 1)}
                        className="mx-1"
                        style={{
                            backgroundColor: '#FF962E',
                            borderRadius: '10px',
                            border: '0',
                        }}
                    >
                        {productPage - 1}
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(productPage)}
                    disabled
                    className="mx-1"
                    style={{
                        backgroundColor: '#FF962E',
                        borderRadius: '10px',
                        border: '0',
                    }}
                >
                    {productPage}
                </button>

                {productPage < productTotalPages && (
                    <button
                        onClick={() => handlePageChange(productPage + 1)}
                        className="mx-1"
                        style={{
                            backgroundColor: '#FF962E',
                            borderRadius: '10px',
                            border: '0',
                        }}
                    >
                        {productPage + 1}
                    </button>
                )}

                {productPage < productTotalPages - 1 && (
                    <>
                        {productPage < productTotalPages - 2 && <span>...</span>}
                        <button
                            onClick={() => handlePageChange(productTotalPages)}
                            className="mx-1"
                            style={{
                                backgroundColor: '#FF962E',
                                borderRadius: '10px',
                                border: '0',
                            }}
                        >
                            {productTotalPages}
                        </button>
                    </>
                )}
            </div>
        );
    }
  };
  
  return (
    <>
    {details ? (
        <>
          <div className="row mt-5 mt-lg-3">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message || 'Something went wrong'}</div>
            ) : product?.length > 0 ? (
                product.map((item) => 
                    <div className="col-sm-12 col-md-12 col-lg-3 mb-5" key={item.id}>
                        <div className="card-item" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '20px'}}>
                            <div className="card-img">
                              {item?.images && item.images.length > 0 ? (
                                    <img src={item.images[0].filename} alt="image" className='w-100 rounded-pill' />
                                    ) : (
                                    <p>No images found</p>
                                )}

                            </div>
                            <div className="card-body">
                                <small>{item.product_name.length > maxLength ? item.product_name.slice(0, maxLength) + "..." : item.product_name}</small>
                                <p style={{color: '#FF962E'}}>₦{item.price.toLocaleString()}</p>
                            </div>
                            <div className="card-footer-item p-3 ml-0">
                                <button className='el2-btn w-100' onClick={() => proDetails(item.id)}><FontAwesomeIcon icon={faShoppingCart} className="mx-2" />View More</button>
                            </div>
                        </div>
                    </div>
                )
            ): (
                <p className='text-center'>No product available.</p>
            )}
            </div>
            {renderProductPagination()}
        </>
    ) : (
        <>
           <div className='d-flex gap-2 mt-5 mt-lg-3'>
                <p style={{color: '#FF962E', cursor: 'pointer'}} onClick={changeProduct}>View Products</p>
                <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> Product Details</p>
            </div>
           <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        productDetails.images && productDetails.images.length > 0 ? (
                            <ImageCarousel images={productDetails.images} />
                        ) : (
                            <p>No images found</p>
                        )
                    )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <p>{productDetails.product_name}</p>
                    <p style={{color: '#f3a557'}}><b>₦{productDetails.main_price.toLocaleString()}</b></p>
                </div>
            </div>
            <div className="below-section mt-5">
                <h5 style={{color: '#f3a557'}}>Product Description</h5>
                <p>{productDetails.product_description}</p>
            </div>
        </>
    )}
    </>
  )
}

export default Commerce