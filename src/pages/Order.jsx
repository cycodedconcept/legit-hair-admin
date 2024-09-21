import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, fetchDetails } from '../features/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCaretRight, 
    faCalendar, 
    faClock, 
    faUserAlt, 
    faEnvelope, 
    faMobile, 
    faMoneyBill,
    faMoneyBillAlt,
    faUserCheck
 } from '@fortawesome/free-solid-svg-icons';
import { Cc } from '../assets/images'

const Order = () => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const { order, currentPage, total_pages, isLoading, error, orderDetails } = useSelector((state) => state.order);

  const token = localStorage.getItem("key");

  useEffect(() => {
    if (token) {
      dispatch(getOrder({ page: currentPage, token }));
    }
  }, [dispatch, currentPage, token]);

  const viewDetails = (id) => {
    console.log(id);
    setShow(false);
    dispatch(fetchDetails({ token, id }));
  };

  const handlePageChange = (page) => {
    dispatch(getOrder({ page, token }));
  };

  return (
    <>
      {show ? (
        isLoading ? (
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
                      <th>Delivery Country</th>
                      <th>Delivery State</th>
                      <th>Delivery Address</th>
                      <th>Date</th>
                      <th>Date Delivered</th>
                      <th>Delivery Landmark</th>
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
            <div className='d-flex gap-2 mt-3'>
                <p style={{color: '#FF962E'}}>Order</p>
                <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> View Details</p>
            </div>

            <div className="d-flex justify-content-between">
                <div>
                    <p>Delivery Date</p>
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <p className='cc mx-2'>12/12/2020</p>
                    </div>
                </div>
                <div>
                    <p>Delivery Time</p>
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faClock}/>
                        <p className='cc mx-2'>12/12/2020</p>
                    </div>
                </div>
                <div>
                    <p>Order Type</p>
                    <p className='cc'>Online</p>
                </div>
                <div>
                    <p>Payment Type</p>
                    <p className='cc'>Mastercard</p>
                </div>

                <div>
                    <p>Order Status</p>
                    <p className='cc'>Pending</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12 col-md-12 col-lg-8 sp p-3">
                    <div className='d-flex justify-content-between'>
                        <h4 className='mb-5'>Product Details</h4>
                        <div>
                          <p>Category Name</p>
                          <p></p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div>
                          <img src={Cc} alt="image"/>
                        </div>
                        <div style={{margin: '90px 0 0 10px'}}>
                            <h5><b>Short Curly Bob Human Hair</b></h5>
                            <p style={{fontSize: '14px'}}>
                                Smartwatch for men women notify you incoming calls, SMS 
                                notifications. when you connect the smartphone with 
                                fitness tracker. A best gift for family and friends
                            </p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Product Amount</p>
                        <p></p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Product Inches</p>
                        <p></p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p>Initial Amount</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Order Quantity</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Discounted</p>
                            <p></p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <img src={Cc} alt="" />
                        <img src={Cc} alt="" />
                        <img src={Cc} alt="" />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 p-3">
                    <h5>Ordered By</h5>

                    <p><FontAwesomeIcon icon={faUserAlt}/></p>
                    <p><FontAwesomeIcon icon={faEnvelope}/></p>
                    <p><FontAwesomeIcon icon={faMobile}/></p>
                    <p><FontAwesomeIcon icon={faMoneyBill}/></p>
                    <p><FontAwesomeIcon icon={faCalendar}/></p>
                    <p><FontAwesomeIcon icon={faMoneyBillAlt}/></p>
                    <p><FontAwesomeIcon icon={faMoneyBillAlt}/></p>
                    <p><FontAwesomeIcon icon={faUserCheck}/></p>
                </div>
            </div>
          </>
      )}
    </>
  );
};

export default Order;
