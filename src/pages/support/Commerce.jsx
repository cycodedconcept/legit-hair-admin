import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productItem, setPageProduct } from '../../features/orderSlice';
import { getProductDetails } from '../../features/allProductSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from './ImageCarousel';
import ProductCartButton from './ProductCartButton';
import Swal from 'sweetalert2';


const Commerce = () => {
  const token = localStorage.getItem("key");
  let maxLength = 20;

  const dispatch = useDispatch();
  const { isLoading, error, product, productPage, productTotalPages} = useSelector((state) => state.order);
  const { productDetails } = useSelector((state) => state.allProducts);

  const [details, setDetails] = useState(true);
  const [selectedInch, setSelectedInch] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('Saved cart:', savedCart);
  }, []);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  })

 
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
        setDetails(false);
        setSelectedInch('');
        setQuantity(1);
      }
  }

  const changeProduct = () => {
    setDetails(true);
  }

  const handleInchChange = (e) => {
    setSelectedInch(e.target.value);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prevQuantity => prevQuantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };


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

  const addToCart = (productToAdd) => {

    if (!selectedInch) {
        Swal.fire({
          title: 'Select an Inch',
          text: 'Please select an inch before adding to the cart.',
          icon: 'warning',
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }
    
    // const isProductInCart = cart.some(item => 
    //   Number(item.id) === Number(productToAdd.id)
    // );

    const isProductInCart = cart.some(item => {
        console.log(`Checking item ID ${item.id} against product ID ${productToAdd.id}`);
        return Number(item.id) === Number(productToAdd.id);
    });
      
    
    if (!isProductInCart) {
        
        const selectedInchObject = productToAdd.inches.find((inche) => String(inche.inche) === String(selectedInch));
        console.log('Selected Inch Object:', selectedInchObject);
        const newCartItem = {
            product_id: productToAdd.product_id,
            product_name: productToAdd.product_name,
            product_amount: productToAdd.main_price_discount || productToAdd.main_price,
            images: productToAdd.images,
            inches: selectedInch,
            category_id: productToAdd.category_id,
            order_quantity: quantity,
            initial_amount: selectedInchObject ? selectedInchObject.price : 0,
            discounted: selectedInchObject ? selectedInchObject.discount : 0,
        };

        console.log('Product to Add ID:', productToAdd.product_id);


        

      const updatedCart = [...cart, newCartItem];
      
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      Swal.fire({
        title: 'Added to Cart!',
        text: `${productToAdd.product_name} has been added to your cart.`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: 'Already in Cart',
        text: `${productToAdd.product_name} is already in your cart.`,
        icon: 'info',
        timer: 3000,
        showConfirmButton: false
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
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
                            {/* <div className="card-footer-item p-3 ml-0">
                                <button className='el2-btn w-100' onClick={() => proDetails(item.id)}><FontAwesomeIcon icon={faShoppingCart} className="mx-2" />View More</button>
                            </div> */}
                            <div className="card-footer-item p-3 ml-0">
                                <button className='el2-btn w-100' onClick={() => proDetails(item.id)}>
                                    View Details
                                </button>
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
                    <p style={{color: '#f3a557'}}>
                        <b>
                        {/* ₦{productDetails.main_price ? productDetails.main_price.toLocaleString() : '0'} */}
                        {productDetails.main_price_discount ? (
                            <>
                            <span className="mx-2">
                                ₦{productDetails.main_price_discount ? productDetails.main_price_discount.toLocaleString() : '0'}
                            </span>
                            <span style={{ textDecoration: 'line-through', color: '#000', fontSize: '13px' }}>
                                ₦{productDetails.main_price ? productDetails.main_price.toLocaleString() : '0'}
                            </span>
                            </>
                        ) : (
                            <>₦{productDetails.main_price ? productDetails.main_price.toLocaleString() : '0'}</>
                        )}
                        </b>
                    </p>
                    <div className="d-flex justify-content-between">
                      <p>{productDetails.product_number}</p>
                      <p>status: {productDetails.status}</p>
                      <p>stock: {productDetails.stock}</p>
                    </div>

                    <label htmlFor="inches" className='mt-5'>Select inches</label>
                    <select id="inches" value={selectedInch} onChange={handleInchChange}>
                        <option value="">--select inches--</option>
                        {productDetails?.inches?.map((inch, index) => (
                            <option value={inch.inche} key={index}>{inch.inche}</option>
                        ))}
                    </select>
                    <div className="d-flex align-items-center mt-3">
                        <button onClick={() => handleQuantityChange('decrease')} className="btn btn-secondary">-</button>
                        <span className="mx-3">{quantity}</span>
                        <button onClick={() => handleQuantityChange('increase')} className="btn btn-secondary">+</button>
                    </div>

                    <ProductCartButton 
                        product={productDetails}
                        cart={cart}
                        onAddToCart={addToCart}
                        className="log-btn mt-5 w-100"
                    />
                </div>
            </div>
            <div className="below-section mt-5">
                <h5 style={{color: '#f3a557'}}>Product Description</h5>
                <small>{productDetails.product_description}</small>
            </div>
            
        </>
    )}
    </>
  )
}

export default Commerce

