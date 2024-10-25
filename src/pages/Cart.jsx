import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInvoice } from '../features/commerceSlice';
import Swal from 'sweetalert2';


const Cart = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("key");
  const { data, success, error, spinItem, products, delivery_address, 
    delivery_state, delivery_country, 
    amount_paid, additional_information, 
    payment_method, delivery_landmark, invoice_id,
    customer_name, customer_phonenumber, customer_email, redirect_url } = useSelector((state) => state.commerce)

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [payment, setPayment] = useState('');
  const [additional, setAdditional] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.product_amount * item.order_quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);

//   const handleQuantityChange = (index, increment) => {
//     const updatedCart = cartItems.map((item, i) => {
//       if (i === index) {
//         const newQuantity = item.quantity + increment;
//         return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
//       }
//       return item;
//     });
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };


const handleChange = (e) => {
    const { name, value } = e.target;
  
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'landmark':
        setLandmark(value);
        break;
      case 'payment':
        setPayment(value);
        break;
      case 'additional':
        setAdditional(value);
        break;
      default:
        break;
    }
  };
  

 function generateUniqueId() {
    const prefix = "Lh";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix;
  
    for (let i = 0; i < 14; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    const cartItem = localStorage.getItem('cart');
    const cartView = cartItem ? JSON.parse(cartItem) : [];
    const productsToSubmit = cartView.map(({ images, product_name, ...rest }) => rest);
    console.log(productsToSubmit)

    if (!cartItem || !address || !state || !country || !payment || !name || !email || !phone) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please fill in all the fields.',
            confirmButtonColor: '#FF962E'
        });
        return;
    }
    const uniqueId = generateUniqueId();
    console.log(address, state, country, payment, name, email, phone, total, typeof uniqueId)


    try {
        const result = await dispatch(createInvoice({
            token, 
            products: productsToSubmit, 
            delivery_address: address,
            delivery_state: state,
            delivery_country: country,
            amount_paid: total,
            payment_method: payment,
            invoice_id: uniqueId,
            customer_email: email,
            customer_name: name,
            customer_phonenumber: phone,
            delivery_landmark: landmark,
            additional_information: additional,
            redirect_url: "https://pluralcode.academy"
        })).unwrap();

        if (result) {
            Swal.fire({
                icon: 'success',
                title: 'Created Successfully',
                text: 'Order created successfully.',
                confirmButtonColor: '#FF962E'
            });
    
            setTimeout(() => {
                Swal.close();
                resetForm();
            }, 3000);
        }
        else {
            throw new Error(result.message || 'Failed to create order.');
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'An error occurred during the submission. Please try again.',
            confirmButtonColor: '#FF962E'
        });
    }
 }

  const hideModal = () => {
      setModal(false)
  }

  const cartModal = () => {
    setModal(true)
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
            {cartItems.map((item, index) => (
            <div key={item.id}>
                <div className="d-flex justify-content-between align-items-center">
                <div style={{borderRight: '1px solid #FF962E'}}>
                    <img src={item.images[0].filename} alt={item.product_name} width="100" style={{ borderRadius: '20px' }} />
                    <p className='w-50 my-3'>{item.product_name}</p>

                    <div className='d-flex gap-5'>
                        <p><span style={{ color: '#FF962E' }}>Price:</span> ₦{item.product_amount.toLocaleString()}</p>
                        <p><span style={{ color: '#FF962E' }}>Inches:</span>{item.inches}</p>
                        <p><span style={{ color: '#FF962E' }}>  Quantity:</span>{item.order_quantity}</p>
                    </div>
                    
                </div>

                {/* <div className='d-flex align-items-center p-3'>
                    <button
                    onClick={() => handleQuantityChange(index, -1)}
                    style={{
                        backgroundColor: '#FF962E',
                        borderRadius: '10px',
                        border: '0',
                    }}
                    >-</button>
                    <span className='px-2'>{item.quantity}</span>
                    <button
                    onClick={() => handleQuantityChange(index, 1)}
                    style={{
                        backgroundColor: '#FF962E',
                        borderRadius: '10px',
                        border: '0',
                    }}
                    >+</button>
                </div> */}
                    <div className='p-5'>
                        <h4><span style={{ color: '#FF962E' }}>Total:</span> ₦{total.toLocaleString()}</h4>
                    </div>
                </div>
                
                {index !== cartItems.length - 1 && (
                <hr style={{ border: '1px solid #FF962E', margin: '20px 0' }} />
                )}
            </div>
            ))}

            <button className='pro-btn mt-5' onClick={cartModal}>Generate Invoice</button>
            
        </>
      )}

      {modal ? (
          <>
           <div className="modal-overlay">
                <div className="modal-content2">
                    <div className="head-mode">
                            <h3>Provide Information</h3>
                            <button className="modal-close" onClick={hideModal}>
                                &times;
                            </button>
                    </div>
                    <div className="modal-body">
                        <form className='w-100' onSubmit={handleSubmit}>
                            <p className='mb-3' style={{color: '#FF962E'}}>Customer Bio</p>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="customer">Name</label>
                                        <input type="text" name="name" placeholder='cyril' className='w-100' value={name} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="customer">Email</label>
                                        <input type="email" name="email" placeholder='cyril@gmail.com' className='w-100' value={email} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">Phone Number</label>
                                        <input type="text" name="phone" placeholder='091234567' className='w-100' value={phone} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">Amount</label>
                                        <input type="text" name=""  className='w-100' value={total} disabled/>
                                    </div>
                                </div>
                            </div>
                            <p className='my-5' style={{color: '#FF962E'}}>Delivery Details</p>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">Country</label>
                                        <input type="text" name="country" placeholder='Nigeria' className='w-100' value={country} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">State</label>
                                        <input type="text" name="state" placeholder='lagos' className='w-100' value={state} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">Address</label>
                                        <input type="text" name="address" className='w-100' value={address} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                    <div className="form-group">
                                        <label htmlFor="customer">Nearest Landmark</label>
                                        <input type="text" name="landmark" className='w-100' value={landmark} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <p className='my-3' style={{color: '#FF962E'}}>Others</p>
                            <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                        <div className="form-group">
                                            <label htmlFor="customer">Payment Method</label>
                                            <input type="text" name="payment" className='w-100' value={payment} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                                        <div className="form-group">
                                            <label htmlFor="customer">Additional Information</label>
                                            <input type="text" name="additional" className='w-100' value={additional} onChange={handleChange}/>
                                        </div>
                                    </div>
                            </div>
                            <button className='log-btn mt-3'>
                                {
                                    spinItem ?(
                                        <>
                                        <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                        <span>Sending... </span>
                                        </>
                                        
                                    ): (
                                        'Send Details'
                                    )
                                }
                            </button>
                        </form>
                    </div>
                </div>
           </div>
          </>
      ) : ''}
      
    </div>
  );
};

export default Cart;
