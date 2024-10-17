import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, fetchDetails, updateStatus, clearStatusUpdate } from '../features/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCaretRight, 
    faCalendar, 
    faUserAlt, 
    faEnvelope, 
    faMobile, 
    faUserCheck,
    faListAlt,
    faEdit
 } from '@fortawesome/free-solid-svg-icons';
 import Swal from 'sweetalert2'

const Order = () => {
  const [show, setShow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  
  const dispatch = useDispatch();
  const { order, currentPage, total_pages, isLoading, error, orderDetails, success, order_id, delivery_status } = useSelector((state) => state.order);

  const token = localStorage.getItem("key");
  const moid = localStorage.getItem("moid");


  useEffect(() => {
    if (token) {
      dispatch(getOrder({ page: currentPage, token }));
    }
  }, [dispatch, currentPage, token]);

  const viewDetails = (id) => {
    setShow(false);
    dispatch(fetchDetails({ token, id }));
  };

  const handlePageChange = (page) => {
    dispatch(getOrder({ page, token }));
  };

  const hideModal = () => {
    setModalVisible(false);
    setDeliveryStatus('');
  };

  const handleStatusChange = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const changeView = () => {
    setShow(true);
  }

  const displayModal = (id) => {
    console.log(id)
    localStorage.setItem('moid', id);
    setModalVisible(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deliveryStatus) { 
      dispatch(updateStatus({ order_id: moid, delivery_status: deliveryStatus, token }));
      hideModal();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please select a status',
        showConfirmButton: true,
      });
    }
  };


  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Order status updated successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      setModalVisible(false);
      setShow(true);

      dispatch(clearStatusUpdate());
      dispatch(getOrder({ page: currentPage, token }));
    }
  }, [success, dispatch, currentPage, token]);

  return (
    <>
      {show ? (
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error?.message || 'Something went wrong'}</div>
        ) : (
          <>
            <div className="outer-wrapper mt-5">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{width: '250px'}}>Delivery Country</th>
                      <th style={{width: '250px'}}>Delivery State</th>
                      <th style={{width: '250px'}}>Delivery Address</th>
                      <th>Date</th>
                      <th>Date Delivered</th>
                      <th style={{width: '250px'}}>Delivery Landmark</th>
                      <th>Order ID</th>
                      <th>Amount Paid</th>
                      <th>Payment Method</th>
                      <th>Payment Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order && order.length > 0 ? (
                      order.map((item) => (
                        <tr key={item.id}>
                          <td>{item.delivery_country}</td>
                          <td>{item.delivery_state}</td>
                          <td>{item.delivery_address}</td>
                          <td>{item.date}</td>
                          <td>{item.date_delivered}</td>
                          <td>{item.delivery_landmark}</td>
                          <td>{item.order_id}</td>
                          <td>{item.amount_paid}</td>
                          <td>{item.payment_method}</td>
                          <td>
                            <button className={item.payment_status}>
                              {item.payment_status}
                            </button>
                          </td>
                          <td>
                            <button
                              style={{
                                backgroundColor: '#FF962E',
                                color: '#fff',
                                outline: 'none',
                                border: '0',
                                borderRadius: '10px',
                              }}
                              onClick={() => viewDetails(item.id)}
                            >
                              View More
                            </button>
                          </td>
                          <td><FontAwesomeIcon icon={faEdit} onClick={() => displayModal(item.id)}/></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11">No order available</td>
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
                      border: '0',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )
      ) : (
          <>
            <div className='d-flex gap-2 mt-5 mt-lg-3'>
                <p style={{color: '#FF962E', cursor: 'pointer'}} onClick={changeView}>Order</p>
                <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> View Details</p>
            </div>

            <div className="d-block d-md-flex d-lg-flex justify-content-between">
                <div>
                    <p>Delivery Date</p>
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faCalendar} style={{color: '#FF962E'}}/>
                        <p className='cc mx-2'>{orderDetails.date}</p>
                    </div>
                </div>
                <div>
                    <p>Order Number</p>
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faListAlt} style={{color: '#FF962E'}}/>
                        <p className='cc mx-2'>{orderDetails.order_id}</p>
                    </div>
                </div>
                <div>
                    <p>Payment Type</p>
                    <p className='cc'>{orderDetails.payment_status}</p>
                </div>
                <div>
                    <p>Payment Type</p>
                    <p className='cc'>{orderDetails.payment_method}</p>
                </div>

                <div>
                    <p>Order Status</p>
                    <p className={orderDetails.delivery_status}>{orderDetails.delivery_status}</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12 col-md-12 col-lg-8 sp p-3">
                    {orderDetails?.product?.map((order) => 
                        <>
                            <div className='d-flex justify-content-between mb-3'>
                                <h4 className='mb-5' style={{color: '#FF962E'}}>Product Details</h4>
                                <div>
                                <p>Category Name</p>
                                <p style={{color: '#FF962E'}}>{order.category_name}</p>
                                </div>
                            </div>
                            <hr style={{border: '1px solid #FF962E'}}/>
                            <div className='d-flex justify-content-between'>
                                <p>Product Amount:</p>
                                <p>{order.product_amount}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Product Inches:</p>
                                <p>{order.inches}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p>Initial Amount</p>
                                    <p className='text-center'>{order.initial_amount}</p>
                                </div>
                                <div>
                                    <p>Order Quantity</p>
                                    <p className='text-center'>{order.order_quantity}</p>
                                </div>
                                <div>
                                    <p>Discounted</p>
                                    <p className='text-center'>{order.discounted}</p>
                                </div>
                            </div>
                            <hr style={{border: '1px solid #FF962E'}}/>

                            <h5 className='mb-3' style={{color: '#FF962E'}}>Product Images:</h5>
                            <div className='d-flex justify-content-between'>
                                {order.images?.map((image, index) =>
                                  <img src={image.filename} alt="image" className='w-25' key={index}/> 
                                )}
                            </div>
                        </>
                    )}

                    <hr style={{border: '1px solid #FF962E'}}/>
                    <h5 className='mb-3' style={{color: '#FF962E'}}>Delivery Information</h5>
                    <div className='d-flex justify-content-between mt-3'>
                        <p>Delivery Country:</p>
                        <small>{orderDetails?.delivery_country}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Delivery State:</p>
                        <small>{orderDetails?.delivery_state}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Delivery Landmark:</p>
                        <small>{orderDetails?.delivery_landmark}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Delivery Address:</p>
                        <small>{orderDetails?.delivery_address}</small>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 p-3">
                    <h5>Ordered By</h5>

                    <div className='d-flex justify-content-between'>
                      <p><FontAwesomeIcon icon={faUserAlt} style={{color: '#FF962E'}}/></p>
                      <small>{orderDetails?.ordered_by?.name}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p><FontAwesomeIcon icon={faEnvelope} style={{color: '#FF962E'}}/></p>
                      <small>{orderDetails?.ordered_by?.email}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p><FontAwesomeIcon icon={faMobile} style={{color: '#FF962E'}}/></p>
                      <small>{orderDetails?.ordered_by?.phone_number}</small>
                    </div>
                    
                    <div className='d-flex justify-content-between'>
                       <p><FontAwesomeIcon icon={faUserCheck} style={{color: '#FF962E'}}/></p>
                       <small>{orderDetails?.ordered_by?.account_status}</small>
                    </div>
                </div>
            </div>
          </>
      )}

      {modalVisible ? (
          <div className="modal-overlay">
            <div className="modal-content2">
                <div className="head-mode">
                    <h3>Change Status</h3>
                    <button className="modal-close" onClick={hideModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form style={{width: '100%'}} onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label>Select Status</label>
                            <select className='w-100' name='delivery_status' value={deliveryStatus} onChange={handleStatusChange}>
                                <option value="">--Choose Option--</option>
                                <option value="processing">Processing</option>
                                <option value="out for delivery">Out for delivery</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button className='log-btn mt-3'>update status</button>
                        </div>
                    </form>
                </div>
            </div>
          </div>
      ) : ''}
      
    </>
  );
};

export default Order;
